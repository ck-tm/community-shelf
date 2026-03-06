import logging

from django.conf import settings
from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django_tenants.admin import TenantAdminMixin
from django_tenants.utils import schema_context
from unfold.admin import ModelAdmin, TabularInline
from unfold.decorators import action

from apps.shared.email import send_html_email

from .models import ContactSubmission, Domain, LibraryRequest, Tenant

logger = logging.getLogger(__name__)


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
    list_display = ("organization_name", "slug", "user", "city", "country", "status", "tenant", "created_at")
    list_filter = ("status",)
    search_fields = ("organization_name", "slug", "user__email", "city", "country")
    readonly_fields = ("user", "organization_name", "slug", "country", "city", "address", "google_maps_url", "description", "created_at")
    actions_detail = ["approve_request", "reject_request"]

    def _redirect_to_change(self, object_id):
        url = reverse("admin:tenants_libraryrequest_change", args=[object_id])
        return HttpResponseRedirect(url)

    @action(
        description="Approve & Create Library",
        url_path="approve-request",
    )
    def approve_request(self, request, object_id):
        lib_request = LibraryRequest.objects.select_related("user").get(pk=object_id)

        if lib_request.status == LibraryRequest.Status.APPROVED:
            messages.warning(request, "This request has already been approved.")
            return self._redirect_to_change(object_id)

        if lib_request.status == LibraryRequest.Status.REJECTED:
            messages.warning(request, "This request was previously rejected.")
            return self._redirect_to_change(object_id)

        slug = lib_request.slug
        if not slug:
            messages.error(request, "This request has no slug. Cannot create tenant.")
            return self._redirect_to_change(object_id)

        # Verify slug is still available
        if Tenant.objects.filter(slug=slug).exists():
            messages.error(
                request,
                f'Slug "{slug}" is already taken by another tenant. '
                "Please edit the request slug first.",
            )
            return self._redirect_to_change(object_id)

        base_domain = getattr(settings, "TENANT_BASE_DOMAIN", "localhost")

        # Tenant creation must happen in the public schema
        with schema_context("public"):
            # Create tenant (auto_create_schema seeds SiteConfig)
            tenant = Tenant.objects.create(
                name=lib_request.organization_name,
                slug=slug,
                schema_name=slug.replace("-", "_"),
            )

            # Create domain
            Domain.objects.create(
                domain=f"{slug}.{base_domain}",
                tenant=tenant,
                is_primary=True,
            )

        # Create admin membership and copy location data in new tenant schema
        with schema_context(tenant.schema_name):
            from apps.library.models import SiteConfig, TenantMembership

            TenantMembership.objects.create(
                user=lib_request.user,
                role=TenantMembership.Role.ADMIN,
            )

            # Copy location data from request to SiteConfig
            site_config = SiteConfig.objects.first()
            if site_config:
                site_config.address = lib_request.address
                site_config.google_maps_url = lib_request.google_maps_url
                site_config.city = lib_request.city
                site_config.country = lib_request.country
                site_config.save()

        # Update request (public schema)
        with schema_context("public"):
            lib_request.status = LibraryRequest.Status.APPROVED
            lib_request.tenant = tenant
            lib_request.save()

        # Send approval email
        library_url = f"https://{slug}.{base_domain}"
        user = lib_request.user
        user_name = f"{user.first_name} {user.last_name}".strip() or user.email
        try:
            send_html_email(
                subject=f"Your library is ready — {lib_request.organization_name}",
                template_name="emails/library_request_approved.html",
                context={
                    "library_request": lib_request,
                    "user_name": user_name,
                    "library_url": library_url,
                    "subdomain": f"{slug}.{base_domain}",
                },
                recipient_list=[user.email],
            )
        except Exception:
            logger.exception("Failed to send approval email")

        messages.success(
            request,
            f'Library "{tenant.name}" created at {slug}.{base_domain}. '
            f"{user.email} is now admin. Approval email sent.",
        )
        return self._redirect_to_change(object_id)

    @action(
        description="Reject Request",
        url_path="reject-request",
    )
    def reject_request(self, request, object_id):
        lib_request = LibraryRequest.objects.select_related("user").get(pk=object_id)

        if lib_request.status == LibraryRequest.Status.APPROVED:
            messages.warning(request, "This request has already been approved.")
            return self._redirect_to_change(object_id)

        if lib_request.status == LibraryRequest.Status.REJECTED:
            messages.warning(request, "This request was already rejected.")
            return self._redirect_to_change(object_id)

        # Update status
        with schema_context("public"):
            lib_request.status = LibraryRequest.Status.REJECTED
            lib_request.save()

        # Send rejection email
        user = lib_request.user
        user_name = f"{user.first_name} {user.last_name}".strip() or user.email
        try:
            send_html_email(
                subject=f"Library request update — {lib_request.organization_name}",
                template_name="emails/library_request_rejected.html",
                context={
                    "library_request": lib_request,
                    "user_name": user_name,
                },
                recipient_list=[user.email],
            )
        except Exception:
            logger.exception("Failed to send rejection email")

        messages.success(
            request,
            f'Request for "{lib_request.organization_name}" has been rejected. '
            f"Notification email sent to {user.email}.",
        )
        return self._redirect_to_change(object_id)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(ModelAdmin):
    list_display = ("subject", "name", "email", "category", "created_at")
    list_filter = ("category", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("name", "email", "category", "subject", "message", "created_at")

    def has_add_permission(self, request):
        return False
