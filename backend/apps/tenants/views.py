import logging

from django.conf import settings
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.shared.email import send_html_email

from .models import ContactSubmission, LibraryRequest, Tenant
from .serializers import (
    ContactSubmissionSerializer,
    LibraryRequestSerializer,
    TenantListSerializer,
)

logger = logging.getLogger(__name__)

CustomUser = settings.AUTH_USER_MODEL


class LibraryRequestListCreateView(generics.ListCreateAPIView):
    """List own library requests or submit a new one."""

    serializer_class = LibraryRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LibraryRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        library_request = serializer.save(user=self.request.user)

        # Notify superadmins
        try:
            from django.contrib.auth import get_user_model

            User = get_user_model()
            superadmin_emails = list(
                User.objects.filter(is_superuser=True, is_active=True)
                .values_list("email", flat=True)
            )
            if superadmin_emails:
                user = self.request.user
                user_name = (
                    f"{user.first_name} {user.last_name}".strip() or user.email
                )
                base_domain = getattr(settings, "TENANT_BASE_DOMAIN", "localhost")
                send_html_email(
                    subject=f"New library request — {library_request.organization_name}",
                    template_name="emails/library_request_created.html",
                    context={
                        "library_request": library_request,
                        "user_name": user_name,
                        "user_email": user.email,
                        "base_domain": base_domain,
                        "admin_url": "https://api-library.costico.eu/admin/tenants/libraryrequest/",
                    },
                    recipient_list=superadmin_emails,
                )
        except Exception:
            logger.exception("Failed to send library request notification email")


class ContactSubmissionCreateView(generics.CreateAPIView):
    """Public contact form — no authentication required."""

    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        submission = serializer.save()

        # Notify superadmins
        try:
            from django.contrib.auth import get_user_model

            User = get_user_model()
            superadmin_emails = list(
                User.objects.filter(is_superuser=True, is_active=True)
                .values_list("email", flat=True)
            )
            if superadmin_emails:
                send_html_email(
                    subject=f"Contact: {submission.subject}",
                    template_name="emails/contact_submission.html",
                    context={
                        "submission": submission,
                        "admin_url": "https://api-library.costico.eu/admin/tenants/contactsubmission/",
                    },
                    recipient_list=superadmin_emails,
                )
        except Exception:
            logger.exception("Failed to send contact submission notification email")


class TenantListView(generics.ListAPIView):
    """Public list of active tenants for the directory."""

    serializer_class = TenantListSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Tenant.objects.filter(is_active=True).exclude(
            schema_name="public"
        ).order_by("name")

    def list(self, request, *args, **kwargs):
        tenants = self.get_queryset()
        serializer = self.get_serializer(tenants, many=True)
        data = serializer.data

        from django_tenants.utils import schema_context
        from apps.library.models import SiteConfig

        tenant_map = {t.id: t for t in tenants}
        for item in data:
            tenant = tenant_map.get(item["id"])
            try:
                with schema_context(tenant.schema_name):
                    config = SiteConfig.objects.first()
                    if config:
                        item["address"] = config.address
                        item["googleMapsUrl"] = config.google_maps_url
                        item["city"] = config.city
                        item["country"] = config.country
                    else:
                        item["address"] = item["googleMapsUrl"] = item["city"] = item["country"] = ""
            except Exception:
                item["address"] = item["googleMapsUrl"] = item["city"] = item["country"] = ""

        return Response(data)
