"""
Seed demo data for a tenant.

Usage:
    python manage.py seed_demo --tenant=demo
    python manage.py seed_demo --schema=demo  (alternative)

Creates types, organizations, titles with copies, curated lists,
and a demo admin user if one doesn't exist.
"""

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django_tenants.utils import schema_context

from apps.tenants.models import Tenant
from apps.library.models import (
    Copy,
    CuratedList,
    Organization,
    Section,
    SiteConfig,
    TenantMembership,
    Title,
    Type,
)

User = get_user_model()

# ── Seed data ─────────────────────────────────────────────────────

TYPES = [
    {"name": "Books", "color": "#0D7377"},
    {"name": "Movies", "color": "#6B4C9A"},
    {"name": "Music", "color": "#C41E3A"},
    {"name": "Games", "color": "#D4AF37"},
    {"name": "Magazines", "color": "#E69500"},
]

ORGANIZATIONS = [
    "Downtown Public Library",
    "University Media Center",
    "Community Arts Hub",
]

TITLES = [
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "type": "Books",
        "description": "A story of wealth, love, and the American Dream in the Jazz Age.",
        "isbn": "978-0-7432-7356-5",
        "year": 1925,
        "language": "English",
        "organization": "Downtown Public Library",
        "cover": "#0D7377",
        "copies": [
            {"condition": "Good", "location": "Main Shelf", "status": "available"},
            {"condition": "Fair", "location": "Storage", "status": "available"},
        ],
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "type": "Books",
        "description": "A classic novel about racial injustice in the American South.",
        "isbn": "978-0-06-112008-4",
        "year": 1960,
        "language": "English",
        "organization": "Downtown Public Library",
        "cover": "#1a5c5f",
        "copies": [
            {"condition": "Excellent", "location": "Classic Literature", "status": "available"},
            {"condition": "Good", "location": "Main Shelf", "status": "reserved"},
        ],
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "type": "Books",
        "description": "A dystopian novel set in a totalitarian society under constant surveillance.",
        "isbn": "978-0-452-28423-4",
        "year": 1949,
        "language": "English",
        "organization": "Downtown Public Library",
        "cover": "#074e52",
        "copies": [
            {"condition": "Good", "location": "Main Shelf", "status": "available"},
        ],
    },
    {
        "title": "Blade Runner 2049",
        "author": "Denis Villeneuve",
        "type": "Movies",
        "description": "A young blade runner discovers a secret that threatens society.",
        "isbn": "DVD-2049-001",
        "year": 2017,
        "language": "English",
        "organization": "University Media Center",
        "cover": "#6B4C9A",
        "copies": [
            {"condition": "Excellent", "location": "DVD Section", "status": "available"},
        ],
    },
    {
        "title": "Inception",
        "author": "Christopher Nolan",
        "type": "Movies",
        "description": "A thief enters the dreams of others to steal secrets.",
        "isbn": "DVD-2010-042",
        "year": 2010,
        "language": "English",
        "organization": "University Media Center",
        "cover": "#8B6BAE",
        "copies": [
            {"condition": "Good", "location": "DVD Section", "status": "available"},
            {"condition": "Fair", "location": "Storage", "status": "available"},
        ],
    },
    {
        "title": "Abbey Road",
        "author": "The Beatles",
        "type": "Music",
        "description": "The iconic album featuring the famous crosswalk cover.",
        "isbn": "VINYL-1969-001",
        "year": 1969,
        "language": "English",
        "organization": "Community Arts Hub",
        "cover": "#C41E3A",
        "copies": [
            {"condition": "Good", "location": "Vinyl Collection", "status": "available"},
        ],
    },
    {
        "title": "Kind of Blue",
        "author": "Miles Davis",
        "type": "Music",
        "description": "The best-selling jazz album of all time.",
        "isbn": "CD-1959-003",
        "year": 1959,
        "language": "English",
        "organization": "Community Arts Hub",
        "cover": "#E63950",
        "copies": [
            {"condition": "Excellent", "location": "CD Collection", "status": "available"},
        ],
    },
    {
        "title": "The Legend of Zelda: Breath of the Wild",
        "author": "Nintendo",
        "type": "Games",
        "description": "An open-world adventure game set in the kingdom of Hyrule.",
        "isbn": "GAME-2017-001",
        "year": 2017,
        "language": "English",
        "organization": "Community Arts Hub",
        "cover": "#D4AF37",
        "copies": [
            {"condition": "Excellent", "location": "Gaming Collection", "status": "available"},
        ],
    },
    {
        "title": "National Geographic",
        "author": "National Geographic Society",
        "type": "Magazines",
        "description": "Monthly magazine covering science, nature, and exploration.",
        "isbn": "MAG-2024-01",
        "year": 2024,
        "language": "English",
        "organization": "Downtown Public Library",
        "cover": "#E69500",
        "copies": [
            {"condition": "Good", "location": "Magazine Rack", "status": "available"},
        ],
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "type": "Books",
        "description": "A romantic novel about manners and marriage in Regency England.",
        "isbn": "978-0-14-143951-8",
        "year": 1813,
        "language": "English",
        "organization": "Downtown Public Library",
        "cover": "#0d9488",
        "copies": [
            {"condition": "Good", "location": "Classic Literature", "status": "available"},
            {"condition": "Excellent", "location": "Main Shelf", "status": "available"},
        ],
    },
    {
        "title": "The Shawshank Redemption",
        "author": "Frank Darabont",
        "type": "Movies",
        "description": "Two imprisoned men bond over several years, finding solace through acts of decency.",
        "isbn": "DVD-1994-001",
        "year": 1994,
        "language": "English",
        "organization": "University Media Center",
        "cover": "#4A3580",
        "copies": [
            {"condition": "Good", "location": "DVD Section", "status": "available"},
        ],
    },
    {
        "title": "Rumours",
        "author": "Fleetwood Mac",
        "type": "Music",
        "description": "One of the best-selling albums of all time, filled with emotional depth.",
        "isbn": "VINYL-1977-002",
        "year": 1977,
        "language": "English",
        "organization": "Community Arts Hub",
        "cover": "#A82D44",
        "copies": [
            {"condition": "Fair", "location": "Vinyl Collection", "status": "available"},
        ],
    },
]

CURATED_LISTS = [
    {
        "title": "Summer Reading Picks",
        "description": "Our top recommendations for lazy summer afternoons.",
        "cover_color": "#0D7377",
        "sections": [
            {
                "heading": "Classic Literature",
                "body": "Timeless stories that never get old.",
                "title_names": ["The Great Gatsby", "Pride and Prejudice", "1984"],
                "order": 0,
            },
            {
                "heading": "Modern Favorites",
                "body": "Contemporary picks worth your time.",
                "title_names": ["To Kill a Mockingbird"],
                "order": 1,
            },
        ],
    },
    {
        "title": "Movie Night Essentials",
        "description": "The perfect films for a cozy evening in.",
        "cover_color": "#6B4C9A",
        "sections": [
            {
                "heading": "Sci-Fi & Thriller",
                "body": "Mind-bending cinema at its finest.",
                "title_names": ["Blade Runner 2049", "Inception"],
                "order": 0,
            },
            {
                "heading": "Drama",
                "body": "Films that move the soul.",
                "title_names": ["The Shawshank Redemption"],
                "order": 1,
            },
        ],
    },
    {
        "title": "Vinyl & CD Collection Highlights",
        "description": "Explore our best music picks across genres and decades.",
        "cover_color": "#C41E3A",
        "sections": [
            {
                "heading": "All-Time Greats",
                "body": "Albums that defined their era.",
                "title_names": ["Abbey Road", "Kind of Blue", "Rumours"],
                "order": 0,
            },
        ],
    },
]


class Command(BaseCommand):
    help = "Seed demo data for a tenant (types, orgs, titles, copies, lists)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--tenant",
            type=str,
            required=True,
            help="Tenant slug (e.g. demo)",
        )
        parser.add_argument(
            "--admin-email",
            type=str,
            default="admin@example.com",
            help="Email for the demo admin user (default: admin@example.com)",
        )
        parser.add_argument(
            "--admin-password",
            type=str,
            default="admin123",
            help="Password for the demo admin user (default: admin123)",
        )

    def handle(self, *args, **options):
        slug = options["tenant"]

        try:
            tenant = Tenant.objects.get(slug=slug)
        except Tenant.DoesNotExist:
            self.stderr.write(self.style.ERROR(f'Tenant "{slug}" not found.'))
            return

        admin_email = options["admin_email"]
        admin_password = options["admin_password"]

        # Create admin user in public schema
        user, created = User.objects.get_or_create(
            email=admin_email,
            defaults={
                "username": admin_email.split("@")[0],
                "first_name": "Demo",
                "last_name": "Admin",
                "is_staff": True,
            },
        )
        if created:
            user.set_password(admin_password)
            user.save()
            self.stdout.write(f"  Created user: {admin_email}")
        else:
            self.stdout.write(f"  User already exists: {admin_email}")

        with schema_context(tenant.schema_name):
            self._seed_data(user)

        self.stdout.write(
            self.style.SUCCESS(f'\n✅ Demo data seeded for tenant "{slug}"!')
        )

    def _seed_data(self, admin_user):
        # Types
        type_map = {}
        for t in TYPES:
            obj, created = Type.objects.get_or_create(
                name=t["name"], defaults={"color": t["color"]}
            )
            type_map[t["name"]] = obj
            self._log("Type", t["name"], created)

        # Organizations
        org_map = {}
        for name in ORGANIZATIONS:
            obj, created = Organization.objects.get_or_create(name=name)
            org_map[name] = obj
            self._log("Organization", name, created)

        # Titles + Copies
        title_map = {}
        for td in TITLES:
            copies_data = td.pop("copies", [])
            title_obj, created = Title.objects.get_or_create(
                title=td["title"],
                defaults={
                    "author": td.get("author", ""),
                    "type": type_map.get(td.get("type")),
                    "description": td.get("description", ""),
                    "isbn": td.get("isbn", ""),
                    "year": td.get("year"),
                    "language": td.get("language", "English"),
                    "organization": org_map.get(td.get("organization")),
                    "cover": td.get("cover", "#0D7377"),
                },
            )
            title_map[td["title"]] = title_obj
            self._log("Title", td["title"], created)
            td["copies"] = copies_data  # restore for reuse

            if created:
                for cd in copies_data:
                    Copy.objects.create(title=title_obj, **cd)

        # Curated Lists + Sections
        for ld in CURATED_LISTS:
            sections_data = ld.pop("sections", [])
            cl, created = CuratedList.objects.get_or_create(
                title=ld["title"],
                defaults={
                    "description": ld.get("description", ""),
                    "cover_color": ld.get("cover_color", "#0D7377"),
                },
            )
            self._log("CuratedList", ld["title"], created)
            ld["sections"] = sections_data  # restore

            if created:
                for sd in sections_data:
                    title_names = sd.pop("title_names", [])
                    section = Section.objects.create(curated_list=cl, **sd)
                    for tn in title_names:
                        if tn in title_map:
                            section.titles.add(title_map[tn])
                    sd["title_names"] = title_names  # restore

        # TenantMembership — make admin user an admin
        membership, created = TenantMembership.objects.get_or_create(
            user=admin_user,
            defaults={"role": TenantMembership.Role.ADMIN},
        )
        self._log("TenantMembership", str(admin_user), created)

        # SiteConfig
        config, created = SiteConfig.objects.get_or_create(
            defaults={
                "site_title": "CommunityShelf",
                "description": "A community library for things worth sharing.",
                "theme_colors": SiteConfig.default_theme_colors(),
            }
        )
        self._log("SiteConfig", config.site_title, created)

    def _log(self, model, name, created):
        status = "created" if created else "exists"
        self.stdout.write(f"  {model}: {name} [{status}]")
