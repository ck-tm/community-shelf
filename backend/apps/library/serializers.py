from rest_framework import serializers

from .models import (
    Copy,
    CuratedList,
    Inquiry,
    Section,
    SiteConfig,
    TenantMembership,
    Title,
    Type,
)


# ── Type ──────────────────────────────────────────────────────────


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ["id", "name", "color"]


# ── Copy (nested inside Title) ────────────────────────────────────


class CopySerializer(serializers.ModelSerializer):
    """Status reflects active inquiries — reserved if any pending/active inquiry exists."""

    status = serializers.SerializerMethodField()

    class Meta:
        model = Copy
        fields = ["id", "condition", "location", "status"]

    def get_status(self, obj):
        active_statuses = ["Pending", "Approved", "Active", "Overdue"]
        if obj.inquiry_set.filter(status__in=active_statuses).exists():
            return Copy.Status.RESERVED
        return obj.status


class CopyWriteSerializer(serializers.ModelSerializer):
    """Used for creating/updating copies under a title (admin)."""

    class Meta:
        model = Copy
        fields = ["id", "condition", "location", "status"]


# ── Title ─────────────────────────────────────────────────────────


class TitleListSerializer(serializers.ModelSerializer):
    """Public list view — matches frontend Title shape exactly."""

    type = serializers.CharField(source="type.name", read_only=True)
    copies = CopySerializer(many=True, read_only=True)

    class Meta:
        model = Title
        fields = [
            "id",
            "title",
            "author",
            "type",
            "description",
            "isbn",
            "year",
            "language",
            "cover",
            "cover_image",
            "publisher",
            "pages",
            "copies",
        ]


class TitleDetailSerializer(TitleListSerializer):
    """Detail view — identical shape, kept separate for extension."""

    pass


class TitleWriteSerializer(serializers.ModelSerializer):
    """Admin create/update — accepts type by name."""

    type = serializers.SlugRelatedField(
        slug_field="name", queryset=Type.objects.all()
    )

    class Meta:
        model = Title
        fields = [
            "id",
            "title",
            "author",
            "type",
            "description",
            "isbn",
            "year",
            "language",
            "cover",
            "cover_image",
            "publisher",
            "pages",
        ]


# ── Curated List + Sections ──────────────────────────────────────


class SectionSerializer(serializers.ModelSerializer):
    """Read — returns titleIds as list of ints."""

    titleIds = serializers.PrimaryKeyRelatedField(
        source="titles", many=True, read_only=True
    )

    class Meta:
        model = Section
        fields = ["id", "heading", "body", "titleIds", "order"]


class SectionWriteSerializer(serializers.ModelSerializer):
    """Write — accepts titleIds as list of ints."""

    titleIds = serializers.PrimaryKeyRelatedField(
        source="titles",
        many=True,
        queryset=Title.objects.all(),
        required=False,
    )

    class Meta:
        model = Section
        fields = ["id", "heading", "body", "titleIds", "order"]


class CuratedListSerializer(serializers.ModelSerializer):
    """Read — matches frontend CuratedList shape."""

    coverColor = serializers.CharField(source="cover_color")
    createdAt = serializers.DateField(source="created_at", read_only=True)
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = CuratedList
        fields = ["id", "title", "description", "coverColor", "createdAt", "sections"]


class CuratedListWriteSerializer(serializers.ModelSerializer):
    """Write — includes nested sections."""

    coverColor = serializers.CharField(source="cover_color")
    sections = SectionWriteSerializer(many=True, required=False)

    class Meta:
        model = CuratedList
        fields = ["id", "title", "description", "coverColor", "sections"]

    def create(self, validated_data):
        sections_data = validated_data.pop("sections", [])
        curated_list = CuratedList.objects.create(**validated_data)
        for section_data in sections_data:
            titles = section_data.pop("titles", [])
            section = Section.objects.create(
                curated_list=curated_list, **section_data
            )
            section.titles.set(titles)
        return curated_list

    def update(self, instance, validated_data):
        sections_data = validated_data.pop("sections", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if sections_data is not None:
            # Replace all sections
            instance.sections.all().delete()
            for section_data in sections_data:
                titles = section_data.pop("titles", [])
                section = Section.objects.create(
                    curated_list=instance, **section_data
                )
                section.titles.set(titles)

        return instance


# ── Inquiry ───────────────────────────────────────────────────────


class InquirySerializer(serializers.ModelSerializer):
    """Read — matches frontend Inquiry shape exactly.

    Frontend expects flat strings for title/type/organization, not IDs.
    """

    title = serializers.CharField(source="title_name", read_only=True)
    type = serializers.CharField(source="type_name", read_only=True)
    userEmail = serializers.EmailField(source="user.email", read_only=True)
    userName = serializers.SerializerMethodField()
    requestDate = serializers.DateField(source="request_date", read_only=True)
    dueDate = serializers.DateField(source="due_date", read_only=True)
    returnDate = serializers.DateField(source="return_date", read_only=True)
    rentalPeriod = serializers.IntegerField(
        source="rental_period", read_only=True
    )

    class Meta:
        model = Inquiry
        fields = [
            "id",
            "title",
            "type",
            "userEmail",
            "userName",
            "status",
            "requestDate",
            "dueDate",
            "returnDate",
            "rentalPeriod",
            "notes",
        ]

    def get_userName(self, obj):
        first = obj.user.first_name or ""
        last = obj.user.last_name or ""
        name = f"{first} {last}".strip()
        return name if name else None


class InquiryCreateSerializer(serializers.Serializer):
    """User submits a borrow request — only title_id + optional copy/notes."""

    title_id = serializers.PrimaryKeyRelatedField(queryset=Title.objects.all())
    copy_id = serializers.PrimaryKeyRelatedField(
        queryset=Copy.objects.all(), required=False, allow_null=True
    )
    notes = serializers.CharField(required=False, allow_blank=True, default="")

    def create(self, validated_data):
        title = validated_data["title_id"]
        copy = validated_data.get("copy_id")
        return Inquiry.objects.create(
            user=self.context["request"].user,
            title_ref=title,
            copy_ref=copy,
            title_name=title.title,
            type_name=title.type.name if title.type else "",
            notes=validated_data.get("notes", ""),
        )


class InquiryAdminUpdateSerializer(serializers.ModelSerializer):
    """Admin update — can change status, due_date, rental_period, notes."""

    dueDate = serializers.DateField(source="due_date", required=False)
    returnDate = serializers.DateField(
        source="return_date", required=False, allow_null=True
    )
    rentalPeriod = serializers.IntegerField(
        source="rental_period", required=False, allow_null=True
    )

    class Meta:
        model = Inquiry
        fields = ["status", "dueDate", "returnDate", "rentalPeriod", "notes"]


# ── SiteConfig ────────────────────────────────────────────────────


class SiteConfigSerializer(serializers.ModelSerializer):
    """Matches frontend siteConfig shape.

    Frontend expects: { logo, title, description, themeColors }
    Model field is site_title → serialized as "title".
    """

    title = serializers.CharField(source="site_title")
    themeColors = serializers.JSONField(source="theme_colors")

    class Meta:
        model = SiteConfig
        fields = ["logo", "title", "description", "themeColors"]


# ── TenantMembership ──────────────────────────────────────────────


class TenantMembershipSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    firstName = serializers.CharField(
        source="user.first_name", read_only=True
    )
    lastName = serializers.CharField(source="user.last_name", read_only=True)

    class Meta:
        model = TenantMembership
        fields = ["id", "email", "firstName", "lastName", "role", "joined_at"]


# ── Stats (admin dashboard) ──────────────────────────────────────


class StatsSerializer(serializers.Serializer):
    totalTitles = serializers.IntegerField()
    totalCopies = serializers.IntegerField()
    availableCopies = serializers.IntegerField()
    activeInquiries = serializers.IntegerField()
    pendingInquiries = serializers.IntegerField()
    overdueInquiries = serializers.IntegerField()
    totalMembers = serializers.IntegerField()
