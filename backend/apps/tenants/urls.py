from django.urls import path

from .views import LibraryRequestListCreateView, TenantListView

urlpatterns = [
    path("library-requests/", LibraryRequestListCreateView.as_view(), name="library-requests"),
    path("tenants/", TenantListView.as_view(), name="tenant-list"),
]
