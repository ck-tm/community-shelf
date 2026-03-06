import logging
from datetime import timedelta

from django.db import connection
from django.db.models import Count, Q
from django.utils import timezone
from rest_framework import generics, mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.shared.email import send_html_email

logger = logging.getLogger(__name__)


class BrowsePagination(PageNumberPagination):
    """Paginator for the public titles browse endpoint."""
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100

from .filters import InquiryFilter, TitleFilter
from .models import (
    Copy,
    CuratedList,
    DescriptionPage,
    Inquiry,
    SiteConfig,
    TenantContactSubmission,
    TenantMembership,
    Title,
    Type,
)
from .permissions import IsTenantAdmin, IsTenantMember
from .serializers import (
    CopySerializer,
    CopyWriteSerializer,
    CuratedListSerializer,
    CuratedListWriteSerializer,
    DescriptionPageSerializer,
    InquiryAdminUpdateSerializer,
    InquiryCreateSerializer,
    InquirySerializer,
    SiteConfigSerializer,
    StatsSerializer,
    TenantContactSubmissionSerializer,
    TenantMembershipSerializer,
    TitleDetailSerializer,
    TitleListSerializer,
    TitleWriteSerializer,
    TypeSerializer,
)


# ═══════════════════════════════════════════════════════════════════
# PUBLIC ENDPOINTS — no auth required
# ═══════════════════════════════════════════════════════════════════


class PublicTitleViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    """GET /api/v1/titles/ and /api/v1/titles/:id/"""

    permission_classes = [AllowAny]
    filterset_class = TitleFilter
    ordering_fields = ["year", "title", "created_at", "available_copies"]
    ordering = ["-year", "title"]
    pagination_class = BrowsePagination

    def get_queryset(self):
        return (
            Title.objects.select_related("type")
            .prefetch_related("copies")
            .annotate(
                available_copies=Count(
                    "copies",
                    filter=Q(copies__status="available"),
                )
            )
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TitleDetailSerializer
        return TitleListSerializer

    @action(detail=False, methods=["get"], url_path="authors", pagination_class=None)
    def authors(self, request):
        """GET /api/v1/titles/authors/ — sorted distinct non-empty author names."""
        qs = (
            Title.objects.exclude(author="")
            .values_list("author", flat=True)
            .distinct()
            .order_by("author")
        )
        return Response(list(qs))


class PublicTypeViewSet(
    mixins.ListModelMixin, viewsets.GenericViewSet
):
    """GET /api/v1/types/ — returns list of types with colors."""

    permission_classes = [AllowAny]
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    pagination_class = None


class PublicCuratedListViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    """GET /api/v1/lists/ and /api/v1/lists/:id/"""

    permission_classes = [AllowAny]

    def get_queryset(self):
        return CuratedList.objects.prefetch_related("sections__titles")

    serializer_class = CuratedListSerializer


class PublicSiteConfigView(generics.RetrieveAPIView):
    """GET /api/v1/site-config/ — returns singleton SiteConfig."""

    permission_classes = [AllowAny]
    serializer_class = SiteConfigSerializer

    def get_object(self):
        config, _ = SiteConfig.objects.get_or_create(
            defaults={
                "site_title": "CommunityShelf",
                "description": "A community library for things worth sharing.",
                "theme_colors": SiteConfig.default_theme_colors(),
            }
        )
        return config


class PublicDescriptionPageView(generics.RetrieveAPIView):
    """GET /api/v1/description-page/ — returns singleton DescriptionPage."""

    permission_classes = [AllowAny]
    serializer_class = DescriptionPageSerializer

    def get_object(self):
        page, _ = DescriptionPage.objects.get_or_create()
        return page


# ═══════════════════════════════════════════════════════════════════
# USER ENDPOINTS — requires auth + tenant membership
# ═══════════════════════════════════════════════════════════════════


class UserInquiryViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    GET    /api/v1/my/inquiries/      — user's own inquiries
    POST   /api/v1/my/inquiries/      — submit a borrow request
    DELETE /api/v1/my/inquiries/:id/  — cancel own pending inquiry
    """

    permission_classes = [IsAuthenticated, IsTenantMember]

    def get_queryset(self):
        return Inquiry.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            return InquiryCreateSerializer
        return InquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # Notify tenant admins
        try:
            admin_emails = list(
                TenantMembership.objects.filter(role="admin")
                .values_list("user__email", flat=True)
            )
            if admin_emails:
                tenant = connection.tenant
                user = request.user
                user_name = f"{user.first_name} {user.last_name}".strip() or user.email
                send_html_email(
                    subject=f"New borrow request — {inquiry.title_name}",
                    template_name="emails/inquiry_created.html",
                    context={
                        "inquiry": inquiry,
                        "user_name": user_name,
                        "user_email": user.email,
                        "library_name": tenant.name,
                        "copy_condition": (
                            inquiry.copy_ref.condition if inquiry.copy_ref else ""
                        ),
                        "admin_url": f"https://{tenant.slug}.library.costico.eu/admin/inquiries",
                    },
                    recipient_list=admin_emails,
                )
        except Exception:
            logger.exception("Failed to send inquiry notification email")

        return Response(
            InquirySerializer(inquiry).data,
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):
        inquiry = self.get_object()
        if inquiry.status != Inquiry.Status.PENDING:
            return Response(
                {"error": "Only pending inquiries can be cancelled."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        inquiry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserProfileView(generics.RetrieveAPIView):
    """GET /api/v1/my/profile/ — membership info for current tenant."""

    permission_classes = [IsAuthenticated, IsTenantMember]
    serializer_class = TenantMembershipSerializer

    def get_object(self):
        return TenantMembership.objects.select_related("user").get(
            user=self.request.user
        )


# ═══════════════════════════════════════════════════════════════════
# ADMIN ENDPOINTS — requires admin role in TenantMembership
# ═══════════════════════════════════════════════════════════════════


class AdminTypeViewSet(viewsets.ModelViewSet):
    """CRUD /api/v1/admin/types/"""

    permission_classes = [IsAuthenticated, IsTenantAdmin]
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    pagination_class = None


class AdminTitleViewSet(viewsets.ModelViewSet):
    """CRUD /api/v1/admin/titles/"""

    permission_classes = [IsAuthenticated, IsTenantAdmin]
    filterset_class = TitleFilter
    search_fields = ["title", "author", "isbn"]
    ordering_fields = ["year", "title", "created_at"]
    ordering = ["-year", "title"]

    def get_queryset(self):
        return Title.objects.select_related("type").prefetch_related(
            "copies"
        )

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return TitleWriteSerializer
        if self.action == "retrieve":
            return TitleDetailSerializer
        return TitleListSerializer


class AdminCopyViewSet(viewsets.ModelViewSet):
    """CRUD /api/v1/admin/titles/:title_pk/copies/"""

    permission_classes = [IsAuthenticated, IsTenantAdmin]
    pagination_class = None

    def get_queryset(self):
        return Copy.objects.filter(title_id=self.kwargs["title_pk"])

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return CopyWriteSerializer
        return CopySerializer

    def perform_create(self, serializer):
        serializer.save(title_id=self.kwargs["title_pk"])


class AdminCuratedListViewSet(viewsets.ModelViewSet):
    """CRUD /api/v1/admin/lists/"""

    permission_classes = [IsAuthenticated, IsTenantAdmin]

    def get_queryset(self):
        return CuratedList.objects.prefetch_related("sections__titles")

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return CuratedListWriteSerializer
        return CuratedListSerializer


class AdminInquiryViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    GET  /api/v1/admin/inquiries/           — all inquiries
    GET  /api/v1/admin/inquiries/:id/       — single inquiry
    PUT  /api/v1/admin/inquiries/:id/       — update status/dates
    POST /api/v1/admin/inquiries/:id/accept/  — accept → Active
    POST /api/v1/admin/inquiries/:id/return/  — mark returned
    POST /api/v1/admin/inquiries/:id/extend/  — extend due date
    """

    permission_classes = [IsAuthenticated, IsTenantAdmin]
    filterset_class = InquiryFilter

    def get_queryset(self):
        return Inquiry.objects.select_related("user", "title_ref")

    def get_serializer_class(self):
        if self.action in ("update", "partial_update"):
            return InquiryAdminUpdateSerializer
        return InquirySerializer

    @action(detail=True, methods=["post"])
    def accept(self, request, pk=None):
        """Accept inquiry → status=Active, set due_date."""
        inquiry = self.get_object()
        rental_days = request.data.get("rentalPeriod", 14)
        inquiry.status = Inquiry.Status.ACTIVE
        inquiry.rental_period = rental_days
        inquiry.due_date = timezone.now().date() + timedelta(days=int(rental_days))
        inquiry.save()
        return Response(InquirySerializer(inquiry).data)

    @action(detail=True, methods=["post"], url_path="return")
    def mark_returned(self, request, pk=None):
        """Mark inquiry as returned."""
        inquiry = self.get_object()
        inquiry.status = Inquiry.Status.RETURNED
        inquiry.return_date = timezone.now().date()
        # Release the copy if one was assigned
        if inquiry.copy_ref:
            inquiry.copy_ref.status = Copy.Status.AVAILABLE
            inquiry.copy_ref.save()
        inquiry.save()
        return Response(InquirySerializer(inquiry).data)

    @action(detail=True, methods=["post"])
    def extend(self, request, pk=None):
        """Extend due date by N days."""
        inquiry = self.get_object()
        extra_days = int(request.data.get("days", 7))
        if inquiry.due_date:
            inquiry.due_date += timedelta(days=extra_days)
        else:
            inquiry.due_date = timezone.now().date() + timedelta(days=extra_days)
        inquiry.save()
        return Response(InquirySerializer(inquiry).data)


class AdminSiteConfigView(generics.RetrieveUpdateAPIView):
    """GET/PUT /api/v1/admin/site-config/"""

    permission_classes = [IsAuthenticated, IsTenantAdmin]
    serializer_class = SiteConfigSerializer

    def get_object(self):
        config, _ = SiteConfig.objects.get_or_create(
            defaults={
                "site_title": "CommunityShelf",
                "description": "A community library for things worth sharing.",
                "theme_colors": SiteConfig.default_theme_colors(),
            }
        )
        return config


class AdminDescriptionPageView(generics.RetrieveUpdateAPIView):
    """GET/PUT /api/v1/admin/description-page/"""

    permission_classes = [IsAuthenticated, IsTenantAdmin]
    serializer_class = DescriptionPageSerializer

    def get_object(self):
        page, _ = DescriptionPage.objects.get_or_create()
        return page


class AdminStatsView(generics.GenericAPIView):
    """GET /api/v1/admin/stats/ — dashboard stats."""

    permission_classes = [IsAuthenticated, IsTenantAdmin]

    def get(self, request):
        data = {
            "totalTitles": Title.objects.count(),
            "totalCopies": Copy.objects.count(),
            "availableCopies": Copy.objects.filter(
                status=Copy.Status.AVAILABLE
            ).count(),
            "activeInquiries": Inquiry.objects.filter(
                status=Inquiry.Status.ACTIVE
            ).count(),
            "pendingInquiries": Inquiry.objects.filter(
                status=Inquiry.Status.PENDING
            ).count(),
            "overdueInquiries": Inquiry.objects.filter(
                status=Inquiry.Status.OVERDUE
            ).count(),
            "totalMembers": TenantMembership.objects.count(),
        }
        serializer = StatsSerializer(data)
        return Response(serializer.data)


class PublicTenantContactView(generics.CreateAPIView):
    """POST /api/v1/contact/ — public contact form for a tenant library."""

    serializer_class = TenantContactSubmissionSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        submission = serializer.save()

        # Notify tenant admins
        try:
            admin_emails = list(
                TenantMembership.objects.filter(role="admin")
                .values_list("user__email", flat=True)
            )
            if admin_emails:
                tenant = connection.tenant
                send_html_email(
                    subject=f"Contact: {submission.subject} — {tenant.name}",
                    template_name="emails/tenant_contact_submission.html",
                    context={
                        "submission": submission,
                        "library_name": tenant.name,
                    },
                    recipient_list=admin_emails,
                )
        except Exception:
            logger.exception("Failed to send tenant contact notification email")
