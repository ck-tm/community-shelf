from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("library", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="title",
            name="cover_image",
            field=models.URLField(
                blank=True, help_text="URL to cover image", max_length=500
            ),
        ),
    ]
