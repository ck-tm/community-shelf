from django.apps import AppConfig


class LibraryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.library"
    verbose_name = "Library"

    def ready(self):
        pass  # Signals moved to Tenant.save() — see tenants/models.py
