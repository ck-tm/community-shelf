import logging

import requests as http_requests
from django.conf import settings
from rest_framework import serializers

from .models import ContactSubmission, LibraryRequest, Tenant

logger = logging.getLogger(__name__)

RESERVED_SLUGS = {"www", "api", "admin", "mail", "ftp", "public"}


class LibraryRequestSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)
    tenant_slug = serializers.SlugField(source="tenant.slug", read_only=True, default=None)
    google_maps_url = serializers.URLField(
        required=False, allow_blank=True
    )

    class Meta:
        model = LibraryRequest
        fields = [
            "id",
            "user_email",
            "organization_name",
            "slug",
            "country",
            "city",
            "address",
            "google_maps_url",
            "description",
            "status",
            "admin_notes",
            "tenant",
            "tenant_slug",
            "created_at",
        ]
        read_only_fields = ["id", "user_email", "status", "admin_notes", "tenant", "tenant_slug", "created_at"]

    def validate_slug(self, value):
        value = value.lower().strip()

        if value in RESERVED_SLUGS:
            raise serializers.ValidationError("This subdomain is reserved.")

        # Check against existing tenants
        if Tenant.objects.filter(slug=value).exists():
            raise serializers.ValidationError("This subdomain is already taken.")

        # Check against other pending requests (exclude self on update)
        qs = LibraryRequest.objects.filter(slug=value, status=LibraryRequest.Status.PENDING)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("This subdomain is already requested.")

        return value


class TenantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ["id", "name", "slug", "created_at"]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    turnstile_token = serializers.CharField(write_only=True)

    class Meta:
        model = ContactSubmission
        fields = ["name", "email", "category", "subject", "message", "turnstile_token"]

    def validate_turnstile_token(self, value):
        secret = getattr(settings, "TURNSTILE_SECRET_KEY", "")
        if not secret:
            # No secret configured — skip verification (dev mode)
            return value

        try:
            resp = http_requests.post(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                data={"secret": secret, "response": value},
                timeout=5,
            )
            result = resp.json()
        except Exception:
            logger.exception("Turnstile verification request failed")
            raise serializers.ValidationError("Verification failed. Please try again.")

        if not result.get("success"):
            raise serializers.ValidationError("Verification failed. Please try again.")

        return value

    def create(self, validated_data):
        validated_data.pop("turnstile_token", None)
        return super().create(validated_data)
