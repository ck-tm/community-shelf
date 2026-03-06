from django.urls import path

from .views import ContactSubmissionCreateView, LibraryRequestListCreateView, TenantListView

urlpatterns = [
    path("library-requests/", LibraryRequestListCreateView.as_view(), name="library-requests"),
    path("tenants/", TenantListView.as_view(), name="tenant-list"),
    path("contact/", ContactSubmissionCreateView.as_view(), name="contact-submit"),
]
