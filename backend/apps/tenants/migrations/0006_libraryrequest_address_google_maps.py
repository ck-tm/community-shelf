from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tenants", "0005_contactsubmission"),
    ]

    operations = [
        migrations.AddField(
            model_name="libraryrequest",
            name="address",
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="libraryrequest",
            name="google_maps_url",
            field=models.URLField(
                blank=True,
                help_text="Google Maps link to the library location",
                max_length=500,
            ),
        ),
    ]
