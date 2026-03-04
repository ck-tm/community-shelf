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
