from django.db import connection
from django.http import JsonResponse
from django_tenants.middleware.main import TenantMainMiddleware
from django_tenants.utils import get_tenant_model


class TenantHeaderMiddleware(TenantMainMiddleware):
    """
    Resolves tenant from:
    1. X-Tenant header (slug) — for frontend on shared domain
    2. Host header — for custom domain tenants (fallback to django-tenants default)
    """

    def process_request(self, request):
        tenant_slug = request.META.get("HTTP_X_TENANT")

        if tenant_slug:
            TenantModel = get_tenant_model()
            try:
                tenant = TenantModel.objects.get(slug=tenant_slug, is_active=True)
                request.tenant = tenant
                connection.set_tenant(tenant)
                return
            except TenantModel.DoesNotExist:
                return JsonResponse(
                    {"error": f'Tenant "{tenant_slug}" not found'},
                    status=404,
                )

        # Fallback: resolve from Host header (custom domains)
        super().process_request(request)


class AdminTenantSwitcherMiddleware:
    """
    Allows admin users to switch between tenant schemas via session.

    Must be placed AFTER SessionMiddleware and AuthenticationMiddleware.
    When admin_tenant_id is in the session (and no X-Tenant header is present),
    it overrides the default public schema resolution for admin pages.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only apply for non-API requests (admin UI) without X-Tenant header
        if (
            not request.META.get("HTTP_X_TENANT")
            and not request.path.startswith("/api/")
            and hasattr(request, "session")
        ):
            tenant_id = request.session.get("admin_tenant_id")
            if tenant_id:
                TenantModel = get_tenant_model()
                try:
                    tenant = TenantModel.objects.get(id=tenant_id, is_active=True)
                    connection.set_tenant(tenant)
                    request.tenant = tenant
                except TenantModel.DoesNotExist:
                    # Stale tenant in session — clear it
                    del request.session["admin_tenant_id"]

        return self.get_response(request)
