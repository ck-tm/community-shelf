from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("library", "0003_title_cover_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="title",
            name="publisher",
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AddField(
            model_name="title",
            name="pages",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
