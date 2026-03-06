from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("library", "0008_translatable_fields_description_page"),
    ]

    operations = [
        migrations.AddField(
            model_name="siteconfig",
            name="address",
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="siteconfig",
            name="google_maps_url",
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="siteconfig",
            name="city",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="siteconfig",
            name="country",
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
