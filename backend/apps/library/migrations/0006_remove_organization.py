from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("library", "0005_alter_title_language"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="title",
            name="organization",
        ),
        migrations.DeleteModel(
            name="Organization",
        ),
    ]
