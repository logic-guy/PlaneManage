# Generated by Django 4.2.3 on 2023-09-12 12:33

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0042_alter_analyticview_created_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='is_draft',
            field=models.BooleanField(default=False),
        ),
    ]
