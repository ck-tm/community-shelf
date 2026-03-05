"""Admin views for switching between tenant schemas."""

from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import get_object_or_404, redirect

from .models import Tenant


@staff_member_required
def switch_schema(request, tenant_id):
    """Switch the admin session to a specific tenant schema."""
    tenant = get_object_or_404(Tenant, id=tenant_id, is_active=True)
    request.session["admin_tenant_id"] = tenant.id
    messages.success(request, f'Switched to schema: {tenant.name}')
    return redirect("/")


@staff_member_required
def clear_schema(request):
    """Switch back to the public schema."""
    request.session.pop("admin_tenant_id", None)
    messages.success(request, "Switched back to public schema.")
    return redirect("/")


# ── Unfold helpers ────────────────────────────────────────────────


def environment_callback(request):
    """Show current schema as an environment badge in Unfold header.

    Returns [label, color_type]. Color types: info, danger, warning, success.
    """
    tenant_id = request.session.get("admin_tenant_id")
    if tenant_id:
        try:
            tenant = Tenant.objects.get(id=tenant_id)
            return [tenant.name, "info"]
        except Tenant.DoesNotExist:
            pass
    return ["Public", "warning"]


def sidebar_navigation(request):
    """
    Build dynamic sidebar navigation that includes a schema switcher.
    Replaces the static UNFOLD SIDEBAR navigation list.
    """
    current_tenant_id = request.session.get("admin_tenant_id")

    nav = [
        {
            "title": "Authentication",
            "items": [
                {
                    "title": "Users",
                    "icon": "person",
                    "link": "/shared/customuser/",
                },
                {
                    "title": "Groups",
                    "icon": "group",
                    "link": "/auth/group/",
                },
            ],
        },
        {
            "title": "Tenants",
            "items": [
                {
                    "title": "Tenants",
                    "icon": "apartment",
                    "link": "/tenants/tenant/",
                },
                {
                    "title": "Domains",
                    "icon": "language",
                    "link": "/tenants/domain/",
                },
            ],
        },
        {
            "title": "Library",
            "items": [
                {
                    "title": "Titles",
                    "icon": "menu_book",
                    "link": "/library/title/",
                },
                {
                    "title": "Copies",
                    "icon": "content_copy",
                    "link": "/library/copy/",
                },
                {
                    "title": "Types",
                    "icon": "category",
                    "link": "/library/type/",
                },
                {
                    "title": "Organizations",
                    "icon": "corporate_fare",
                    "link": "/library/organization/",
                },
            ],
        },
        {
            "title": "Content",
            "items": [
                {
                    "title": "Curated Lists",
                    "icon": "format_list_bulleted",
                    "link": "/library/curatedlist/",
                },
                {
                    "title": "Inquiries",
                    "icon": "mail",
                    "link": "/library/inquiry/",
                },
            ],
        },
        {
            "title": "Settings",
            "items": [
                {
                    "title": "Site Config",
                    "icon": "settings",
                    "link": "/library/siteconfig/",
                },
                {
                    "title": "Memberships",
                    "icon": "badge",
                    "link": "/library/tenantmembership/",
                },
            ],
        },
    ]

    # ── Schema Switcher section ──────────────────────────────────
    switcher_items = []

    # "Public Schema" option
    if current_tenant_id:
        switcher_items.append({
            "title": "Public Schema",
            "icon": "arrow_back",
            "link": "/switch-schema/clear/",
        })
    else:
        switcher_items.append({
            "title": "Public Schema",
            "icon": "check_circle",
            "link": "/switch-schema/clear/",
        })

    # List all active tenants (excluding public)
    tenants = Tenant.objects.filter(
        is_active=True,
    ).exclude(schema_name="public").order_by("name")

    for tenant in tenants:
        is_current = current_tenant_id == tenant.id
        switcher_items.append({
            "title": tenant.name,
            "icon": "check_circle" if is_current else "swap_horiz",
            "link": f"/switch-schema/{tenant.id}/",
        })

    nav.append({
        "title": "Schema",
        "collapsible": True,
        "items": switcher_items,
    })

    return nav
