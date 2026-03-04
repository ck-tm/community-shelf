import django_filters
from django.db.models import Q

from .models import Inquiry, Title


class TitleFilter(django_filters.FilterSet):
    """Filters for the public title list endpoint.

    Supports:
      ?type=Books          — exact match on type name
      ?search=django       — searches title, author, isbn
      ?author=tolkien      — author icontains
      ?year=2024           — exact year
    """

    type = django_filters.CharFilter(field_name="type__name")
    search = django_filters.CharFilter(method="filter_search")
    author = django_filters.CharFilter(field_name="author", lookup_expr="icontains")

    class Meta:
        model = Title
        fields = ["type", "year", "author"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value)
            | Q(author__icontains=value)
            | Q(isbn__icontains=value)
        )


class InquiryFilter(django_filters.FilterSet):
    """Admin inquiry list filters."""

    status = django_filters.CharFilter(lookup_expr="iexact")

    class Meta:
        model = Inquiry
        fields = ["status"]
