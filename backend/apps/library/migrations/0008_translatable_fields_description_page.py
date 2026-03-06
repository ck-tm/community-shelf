from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("library", "0007_alter_siteconfig_logo"),
    ]

    operations = [
        # Type._ro
        migrations.AddField(
            model_name="type",
            name="name_ro",
            field=models.CharField(blank=True, max_length=100),
        ),
        # CuratedList._ro
        migrations.AddField(
            model_name="curatedlist",
            name="title_ro",
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="curatedlist",
            name="description_ro",
            field=models.TextField(blank=True),
        ),
        # Section._ro
        migrations.AddField(
            model_name="section",
            name="heading_ro",
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AddField(
            model_name="section",
            name="body_ro",
            field=models.TextField(blank=True),
        ),
        # SiteConfig._ro
        migrations.AddField(
            model_name="siteconfig",
            name="site_title_ro",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name="siteconfig",
            name="description_ro",
            field=models.TextField(blank=True),
        ),
        # DescriptionPage (new model)
        migrations.CreateModel(
            name="DescriptionPage",
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
                ("title", models.CharField(default="About Us", max_length=200)),
                ("title_ro", models.CharField(blank=True, max_length=200)),
                ("body", models.TextField(blank=True)),
                ("body_ro", models.TextField(blank=True)),
                (
                    "mission_title",
                    models.CharField(
                        blank=True, default="Our Mission", max_length=200
                    ),
                ),
                ("mission_title_ro", models.CharField(blank=True, max_length=200)),
                ("mission_text", models.TextField(blank=True)),
                ("mission_text_ro", models.TextField(blank=True)),
            ],
            options={
                "verbose_name": "Description Page",
            },
        ),
    ]
