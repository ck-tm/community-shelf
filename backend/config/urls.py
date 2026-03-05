"""URL configuration for CommunityShelf backend."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from apps.tenants.admin_views import clear_schema, switch_schema

urlpatterns = [
    path("api/v1/", include("apps.library.urls")),
    path("api/v1/auth/", include("apps.shared.urls")),
    path("api/v1/platform/", include("apps.tenants.urls")),
    # Admin schema switcher (must be before admin catch-all)
    path("switch-schema/clear/", clear_schema, name="clear-schema"),
    path("switch-schema/<int:tenant_id>/", switch_schema, name="switch-schema"),
    path("", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    try:
        import debug_toolbar

        urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
    except ImportError:
        pass
