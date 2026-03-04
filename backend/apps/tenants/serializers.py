from rest_framework import serializers

from .models import LibraryRequest, Tenant


class LibraryRequestSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)
    tenant_slug = serializers.SlugField(source="tenant.slug", read_only=True, default=None)

    class Meta:
        model = LibraryRequest
        fields = [
            "id",
            "user_email",
            "organization_name",
            "description",
            "status",
            "admin_notes",
            "tenant",
            "tenant_slug",
            "created_at",
        ]
        read_only_fields = ["id", "user_email", "status", "admin_notes", "tenant", "tenant_slug", "created_at"]


class TenantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ["id", "name", "slug", "created_at"]
