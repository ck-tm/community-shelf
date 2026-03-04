from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

# ── Public routes ─────────────────────────────────────────────────

public_router = DefaultRouter()
public_router.register(r"titles", views.PublicTitleViewSet, basename="title")
public_router.register(r"types", views.PublicTypeViewSet, basename="type")
public_router.register(r"lists", views.PublicCuratedListViewSet, basename="list")

# ── User routes (/my/) ────────────────────────────────────────────

user_router = DefaultRouter()
user_router.register(
    r"inquiries", views.UserInquiryViewSet, basename="my-inquiry"
)

# ── Admin routes (/admin/) ────────────────────────────────────────

admin_router = DefaultRouter()
admin_router.register(r"types", views.AdminTypeViewSet, basename="admin-type")
admin_router.register(r"titles", views.AdminTitleViewSet, basename="admin-title")
admin_router.register(
    r"lists", views.AdminCuratedListViewSet, basename="admin-list"
)
admin_router.register(
    r"inquiries", views.AdminInquiryViewSet, basename="admin-inquiry"
)

# Nested copies under admin titles
admin_copy_list = views.AdminCopyViewSet.as_view(
    {"get": "list", "post": "create"}
)
admin_copy_detail = views.AdminCopyViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    # Public
    path("", include(public_router.urls)),
    path("site-config/", views.PublicSiteConfigView.as_view(), name="site-config"),
    # User
    path("my/", include(user_router.urls)),
    path("my/profile/", views.UserProfileView.as_view(), name="my-profile"),
    # Admin
    path("admin/", include(admin_router.urls)),
    path(
        "admin/titles/<int:title_pk>/copies/",
        admin_copy_list,
        name="admin-copy-list",
    ),
    path(
        "admin/titles/<int:title_pk>/copies/<int:pk>/",
        admin_copy_detail,
        name="admin-copy-detail",
    ),
    path(
        "admin/site-config/",
        views.AdminSiteConfigView.as_view(),
        name="admin-site-config",
    ),
    path("admin/stats/", views.AdminStatsView.as_view(), name="admin-stats"),
]
