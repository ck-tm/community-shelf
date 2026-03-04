from django.contrib import admin
from django.db import connection
from unfold.admin import ModelAdmin, StackedInline, TabularInline

from .models import (
    Copy,
    CuratedList,
    Inquiry,
    Section,
    SiteConfig,
    TenantMembership,
    Title,
    Type,
)


# ── Tenant-only mixin ─────────────────────────────────────────────
# Library tables live exclusively in tenant schemas.  When the admin
# is accessed from the *public* schema (e.g. to manage Tenants /
# Domains), any query against these tables triggers a
# ProgrammingError that poisons the current PostgreSQL transaction.
# This mixin hides library models from the admin sidebar and
# prevents any accidental queries when the active schema is public.


class TenantOnlyMixin:
    """Hide this ModelAdmin when the request is on the public schema."""

    def _is_public_schema(self):
        return connection.schema_name == "public"

    def has_module_permission(self, request):
        if self._is_public_schema():
            return False
        return super().has_module_permission(request)

    def has_view_permission(self, request, obj=None):
        if self._is_public_schema():
            return False
        return super().has_view_permission(request, obj)

    def has_add_permission(self, request, obj=None):
        if self._is_public_schema():
            return False
        # ModelAdmin.has_add_permission takes only (request,)
        # but InlineModelAdmin takes (request, obj) — pass obj only if present
        if obj is not None:
            return super().has_add_permission(request, obj)
        return super().has_add_permission(request)

    def has_change_permission(self, request, obj=None):
        if self._is_public_schema():
            return False
        return super().has_change_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        if self._is_public_schema():
            return False
        return super().has_delete_permission(request, obj)


# ── Inlines ───────────────────────────────────────────────────────


class CopyInline(TabularInline):
    model = Copy
    extra = 1


class SectionInline(StackedInline):
    model = Section
    extra = 0
    filter_horizontal = ("titles",)


# ── Model Admins ──────────────────────────────────────────────────


@admin.register(Type)
class TypeAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = ("name", "color")
    search_fields = ("name",)


@admin.register(Title)
class TitleAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = ("title", "author", "type", "year", "isbn")
    list_filter = ("type", "language")
    search_fields = ("title", "author", "isbn")
    inlines = [CopyInline]


@admin.register(Copy)
class CopyAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = ("title", "condition", "location", "status")
    list_filter = ("condition", "status")
    search_fields = ("title__title", "location")


@admin.register(CuratedList)
class CuratedListAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = ("title", "created_at", "updated_at")
    search_fields = ("title",)
    inlines = [SectionInline]


@admin.register(Inquiry)
class InquiryAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = (
        "title_name",
        "user",
        "status",
        "request_date",
        "due_date",
        "return_date",
    )
    list_filter = ("status",)
    search_fields = ("title_name", "user__email")
    readonly_fields = ("request_date",)


@admin.register(TenantMembership)
class TenantMembershipAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = ("user", "role", "joined_at")
    list_filter = ("role",)
    search_fields = ("user__email",)


@admin.register(SiteConfig)
class SiteConfigAdmin(TenantOnlyMixin, ModelAdmin):
    list_display = ("site_title",)

    def has_add_permission(self, request):
        if self._is_public_schema():
            return False
        # Singleton — only allow add if none exist
        return not SiteConfig.objects.exists()
