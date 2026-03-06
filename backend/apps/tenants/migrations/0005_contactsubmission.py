from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tenants", "0004_libraryrequest_slug"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContactSubmission",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("general", "General Inquiry"),
                            ("feature", "Feature Suggestion"),
                            ("bug", "Bug Report"),
                        ],
                        default="general",
                        max_length=10,
                    ),
                ),
                ("subject", models.CharField(max_length=300)),
                ("message", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Contact Submission",
                "verbose_name_plural": "Contact Submissions",
                "db_table": "tenants_contact_submission",
                "ordering": ["-created_at"],
            },
        ),
    ]
