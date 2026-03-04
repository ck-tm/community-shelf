from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import LibraryRequest, Tenant
from .serializers import LibraryRequestSerializer, TenantListSerializer


class LibraryRequestListCreateView(generics.ListCreateAPIView):
    """List own library requests or submit a new one."""

    serializer_class = LibraryRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LibraryRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TenantListView(generics.ListAPIView):
    """Public list of active tenants for the directory."""

    serializer_class = TenantListSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Tenant.objects.filter(is_active=True).exclude(
            schema_name="public"
        ).order_by("name")
