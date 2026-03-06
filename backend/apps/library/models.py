from django.conf import settings
from django.db import models


class TenantMembership(models.Model):
    """Links shared users to tenants with roles."""

    class Role(models.TextChoices):
        MEMBER = "member", "Member"
        ADMIN = "admin", "Admin"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="tenant_memberships",
    )
    role = models.CharField(
        max_length=10, choices=Role.choices, default=Role.MEMBER
    )
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user",)

    def __str__(self):
        return f"{self.user.email} ({self.role})"


class Type(models.Model):
    name = models.CharField(max_length=100, unique=True)
    name_ro = models.CharField(max_length=100, blank=True)
    color = models.CharField(
        max_length=7, default="#0D7377", help_text="Hex color code"
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Title(models.Model):
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=300, blank=True)
    type = models.ForeignKey(
        Type, on_delete=models.SET_NULL, null=True, related_name="titles"
    )
    description = models.TextField(blank=True)
    isbn = models.CharField(max_length=50, blank=True, verbose_name="ISBN / ID")
    year = models.IntegerField(null=True, blank=True)
    language = models.CharField(max_length=50, default="English", null=True, blank=True)
    cover = models.CharField(
        max_length=7, default="#0D7377", help_text="Hex color for cover"
    )
    cover_image = models.URLField(
        max_length=500, blank=True, help_text="URL to cover image"
    )
    publisher = models.CharField(max_length=300, blank=True)
    pages = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year", "title"]

    def __str__(self):
        return self.title

    @property
    def available_copies_count(self):
        return self.copies.filter(status=Copy.Status.AVAILABLE).count()


class Copy(models.Model):
    class Condition(models.TextChoices):
        EXCELLENT = "Excellent", "Excellent"
        GOOD = "Good", "Good"
        FAIR = "Fair", "Fair"

    class Status(models.TextChoices):
        AVAILABLE = "available", "Available"
        RESERVED = "reserved", "Reserved"

    title = models.ForeignKey(
        Title, on_delete=models.CASCADE, related_name="copies"
    )
    condition = models.CharField(
        max_length=10, choices=Condition.choices, default=Condition.GOOD
    )
    location = models.CharField(max_length=200)
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.AVAILABLE
    )

    class Meta:
        verbose_name_plural = "copies"

    def __str__(self):
        return f"Copy of {self.title.title} ({self.condition}, {self.location})"


class CuratedList(models.Model):
    title = models.CharField(max_length=500)
    title_ro = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    description_ro = models.TextField(blank=True)
    cover_color = models.CharField(max_length=7, default="#0D7377")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Section(models.Model):
    curated_list = models.ForeignKey(
        CuratedList, on_delete=models.CASCADE, related_name="sections"
    )
    heading = models.CharField(max_length=300)
    heading_ro = models.CharField(max_length=300, blank=True)
    body = models.TextField(blank=True)
    body_ro = models.TextField(blank=True)
    titles = models.ManyToManyField(Title, blank=True, related_name="sections")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.heading


class Inquiry(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        APPROVED = "Approved", "Approved"
        ACTIVE = "Active", "Active"
        OVERDUE = "Overdue", "Overdue"
        RETURNED = "Returned", "Returned"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="inquiries",
    )
    title_ref = models.ForeignKey(
        Title, on_delete=models.SET_NULL, null=True, related_name="inquiries"
    )
    copy_ref = models.ForeignKey(
        Copy, on_delete=models.SET_NULL, null=True, blank=True
    )

    # Denormalized fields (preserved for display even if Title/Copy deleted)
    title_name = models.CharField(max_length=500)
    type_name = models.CharField(max_length=100, blank=True)
    organization_name = models.CharField(max_length=200, blank=True)

    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.PENDING
    )
    request_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    return_date = models.DateField(null=True, blank=True)
    rental_period = models.PositiveIntegerField(
        null=True, blank=True, help_text="Days"
    )
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-request_date"]
        verbose_name_plural = "inquiries"

    def __str__(self):
        return f"{self.title_name} — {self.status}"


class SiteConfig(models.Model):
    """Singleton per tenant — site identity and theme."""

    logo = models.ImageField(upload_to="logos/", blank=True, null=True)
    site_title = models.CharField(max_length=200, default="CommunityShelf")
    site_title_ro = models.CharField(max_length=200, blank=True)
    description = models.TextField(
        blank=True,
        default="A community library for things worth sharing.",
    )
    description_ro = models.TextField(blank=True)
    theme_colors = models.JSONField(default=dict, blank=True)
    address = models.CharField(max_length=500, blank=True)
    google_maps_url = models.URLField(max_length=500, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Site Configuration"

    def __str__(self):
        return self.site_title

    def save(self, *args, **kwargs):
        # Enforce singleton: only one SiteConfig per tenant schema
        if not self.pk and SiteConfig.objects.exists():
            existing = SiteConfig.objects.first()
            self.pk = existing.pk
        if not self.theme_colors:
            self.theme_colors = self.default_theme_colors()
        super().save(*args, **kwargs)

    @staticmethod
    def default_theme_colors():
        return {
            "teal-600": "#0d9488",
            "teal-700": "#0d7377",
            "teal-800": "#0a5c5f",
            "teal-900": "#074e52",
            "cream": "#f8f4ed",
            "warm": "#f3ede4",
            "amber-500": "#f5a623",
        }


class DescriptionPage(models.Model):
    """Singleton per tenant — admin-editable About page content."""

    title = models.CharField(max_length=200, default="About Us")
    title_ro = models.CharField(max_length=200, blank=True)
    body = models.TextField(blank=True)
    body_ro = models.TextField(blank=True)
    mission_title = models.CharField(max_length=200, blank=True, default="Our Mission")
    mission_title_ro = models.CharField(max_length=200, blank=True)
    mission_text = models.TextField(blank=True)
    mission_text_ro = models.TextField(blank=True)

    class Meta:
        verbose_name = "Description Page"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Enforce singleton: only one DescriptionPage per tenant schema
        if not self.pk and DescriptionPage.objects.exists():
            existing = DescriptionPage.objects.first()
            self.pk = existing.pk
        super().save(*args, **kwargs)


class TenantContactSubmission(models.Model):
    """Contact form submissions for a specific tenant library."""

    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name}"
