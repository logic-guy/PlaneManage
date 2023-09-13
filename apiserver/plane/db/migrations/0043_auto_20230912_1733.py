# Generated by Django 4.2.3 on 2023-09-12 17:33

from django.db import migrations


def update_issue_priority_choice(apps, schema_editor):
    IssueModel = apps.get_model("db", "Issue")
    updated_issues = []
    for obj in IssueModel.objects.all():
        if obj.priority is None:
            obj.priority = "none"
        updated_issues.append(obj)
    IssueModel.objects.bulk_update(updated_issues, ["priority"], batch_size=100)


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0042_alter_analyticview_created_by_and_more'),
    ]

    operations = [
        migrations.RunPython(update_issue_priority_choice),
    ]
