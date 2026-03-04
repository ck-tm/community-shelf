from django.contrib import admin, messages
from django.utils.text import slugify
from django_tenants.admin import TenantAdminMixin
from django_tenants.utils import schema_context
from unfold.admin import ModelAdmin, TabularInline
from unfold.decorators import action

from .models import Domain, LibraryRequest, Tenant


class DomainInline(TabularInline):
    model = Domain
    extra = 1


@admin.register(Tenant)
class TenantAdmin(TenantAdminMixin, ModelAdmin):
    list_display = ("name", "slug", "schema_name", "is_active", "domains", "created_at")
    list_filter = ("is_active",)
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [DomainInline]

    def domains(self, obj):
        return ", ".join([domain.domain for domain in obj.domains.all()])


@admin.register(Domain)
class DomainAdmin(ModelAdmin):
    list_display = ("domain", "tenant", "is_primary")
    list_filter = ("is_primary",)


@admin.register(LibraryRequest)
class LibraryRequestAdmin(ModelAdmin):
    list_display = ("organization_name", "user", "status", "tenant", "created_at")
    list_filter = ("status",)
    search_fields = ("organization_name", "user__email")
    readonly_fields = ("user", "organization_name", "description", "created_at")
    actions_detail = ["approve_and_create_tenant"]

    @action(
        description="Approve & Create Tenant",
        url_path="approve-create-tenant",
    )
    def approve_and_create_tenant(self, request, object_id):
        lib_request = LibraryRequest.objects.get(pk=object_id)

        if lib_request.status == LibraryRequest.Status.APPROVED:
            messages.warning(request, "This request has already been approved.")
            return

        slug = slugify(lib_request.organization_name)
        # Ensure unique slug
        base_slug = slug
        counter = 1
        while Tenant.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        # Create tenant (auto_create_schema seeds SiteConfig)
        tenant = Tenant.objects.create(
            name=lib_request.organization_name,
            slug=slug,
            schema_name=slug.replace("-", "_"),
        )

        # Create domain
        Domain.objects.create(
            domain=f"{slug}.localhost",
            tenant=tenant,
            is_primary=True,
        )

        # Create admin membership in new tenant schema
        with schema_context(tenant.schema_name):
            from apps.library.models import TenantMembership

            TenantMembership.objects.create(
                user=lib_request.user,
                role=TenantMembership.Role.ADMIN,
            )

        # Update request
        lib_request.status = LibraryRequest.Status.APPROVED
        lib_request.tenant = tenant
        lib_request.save()

        messages.success(
            request,
            f'Tenant "{tenant.name}" created with domain {slug}.localhost. '
            f"{lib_request.user.email} is now admin.",
        )
