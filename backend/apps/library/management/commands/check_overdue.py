"""
Mark overdue inquiries.

Usage:
    python manage.py check_overdue

Scans all tenant schemas for Active inquiries past their due date
and updates their status to Overdue.

Designed to be run as a daily cron job:
    0 2 * * * cd /app && python manage.py check_overdue
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from django_tenants.utils import schema_context

from apps.tenants.models import Tenant
from apps.library.models import Inquiry


class Command(BaseCommand):
    help = "Mark active inquiries past their due date as overdue."

    def handle(self, *args, **options):
        today = timezone.now().date()
        total_updated = 0

        tenants = Tenant.objects.exclude(schema_name="public")

        for tenant in tenants:
            with schema_context(tenant.schema_name):
                updated = Inquiry.objects.filter(
                    status=Inquiry.Status.ACTIVE,
                    due_date__lt=today,
                ).update(status=Inquiry.Status.OVERDUE)

                if updated:
                    self.stdout.write(
                        f"  {tenant.slug}: {updated} inquiries marked overdue"
                    )
                    total_updated += updated

        if total_updated:
            self.stdout.write(
                self.style.SUCCESS(
                    f"\n✅ Total: {total_updated} inquiries marked overdue."
                )
            )
        else:
            self.stdout.write(self.style.SUCCESS("✅ No overdue inquiries found."))
