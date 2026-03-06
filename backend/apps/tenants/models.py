from django.conf import settings
from django.db import models
from django_tenants.models import DomainMixin, TenantMixin


class Tenant(TenantMixin):
    """Each tenant represents one community library."""

    name = models.CharField(max_length=200)
    slug = models.SlugField(
        unique=True,
        help_text="URL-safe identifier, sent via X-Tenant header",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    auto_create_schema = True

    class Meta:
        db_table = "tenants_tenant"

    def __str__(self):
        return self.name

    def save(self, verbosity=1, *args, **kwargs):
        is_new = self.pk is None
        super().save(verbosity=verbosity, *args, **kwargs)
        # After super().save(), the schema has been created and migrated
        # (if auto_create_schema=True), so it's now safe to seed data.
        if is_new and self.auto_create_schema:
            self._create_default_data()

    def _create_default_data(self):
        """Seed a new tenant schema with sensible defaults."""
        from django_tenants.utils import schema_context

        try:
            from apps.library.models import SiteConfig

            with schema_context(self.schema_name):
                SiteConfig.objects.get_or_create(
                    defaults={
                        "site_title": self.name,
                        "description": (
                            "A community library for things worth sharing."
                        ),
                        "theme_colors": SiteConfig.default_theme_colors(),
                    }
                )
        except Exception:
            # Schema might not be fully migrated yet in edge cases
            pass


class Domain(DomainMixin):
    """Maps domains/subdomains to tenants. Each tenant can have multiple domains."""

    class Meta:
        db_table = "tenants_domain"


class LibraryRequest(models.Model):
    """Request to create a new community library (tenant)."""

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="library_requests",
    )
    organization_name = models.CharField(max_length=200)
    slug = models.SlugField(
        max_length=63,
        help_text="Desired subdomain for the library",
    )
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=500, blank=True)
    google_maps_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="Google Maps link to the library location",
    )
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING,
    )
    admin_notes = models.TextField(blank=True)
    tenant = models.ForeignKey(
        Tenant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="library_request",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "tenants_library_request"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.organization_name} ({self.status})"


class ContactSubmission(models.Model):
    """Public contact form submission."""

    class Category(models.TextChoices):
        GENERAL = "general", "General Inquiry"
        FEATURE = "feature", "Feature Suggestion"
        BUG = "bug", "Bug Report"

    name = models.CharField(max_length=200)
    email = models.EmailField()
    category = models.CharField(
        max_length=10,
        choices=Category.choices,
        default=Category.GENERAL,
    )
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "tenants_contact_submission"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} ({self.get_category_display()})"
