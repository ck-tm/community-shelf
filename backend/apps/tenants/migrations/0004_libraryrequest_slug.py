from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tenants", "0003_add_country_city_to_library_request"),
    ]

    operations = [
        migrations.AddField(
            model_name="libraryrequest",
            name="slug",
            field=models.SlugField(
                default="",
                help_text="Desired subdomain for the library",
                max_length=63,
            ),
            preserve_default=False,
        ),
    ]
