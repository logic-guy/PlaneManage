# Generated by Django 4.2.3 on 2023-07-19 06:52

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import plane.db.models.user
import uuid


def onboarding_default_steps(apps, schema_editor):
    default_onboarding_schema = {
        "workspace_join": True,
        "profile_complete": True,
        "workspace_create": True,
        "workspace_invite": True,
    }

    Model = apps.get_model("db", "User")
    updated_user = []
    for obj in Model.objects.filter(is_onboarded=True):
        obj.onboarding_step = default_onboarding_schema
        obj.is_tour_completed = True
        updated_user.append(obj)

    Model.objects.bulk_update(updated_user, ["onboarding_step"], batch_size=100)


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0036_alter_workspace_organization_size"),
    ]

    operations = [
        migrations.AddField(
            model_name="issue",
            name="archived_at",
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="archive_in",
            field=models.IntegerField(
                default=0,
                validators=[
                    django.core.validators.MinValueValidator(0),
                    django.core.validators.MaxValueValidator(12),
                ],
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="close_in",
            field=models.IntegerField(
                default=0,
                validators=[
                    django.core.validators.MinValueValidator(0),
                    django.core.validators.MaxValueValidator(12),
                ],
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="default_state",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="default_state",
                to="db.state",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="is_tour_completed",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="user",
            name="onboarding_step",
            field=models.JSONField(default=plane.db.models.user.get_default_onboarding),
        ),
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(
                        auto_now=True, verbose_name="Last Modified At"
                    ),
                ),
                (
                    "id",
                    models.UUIDField(
                        db_index=True,
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("data", models.JSONField(null=True)),
                ("entity_identifier", models.UUIDField(null=True)),
                ("entity_name", models.CharField(max_length=255)),
                ("title", models.TextField()),
                ("message", models.JSONField(null=True)),
                ("message_html", models.TextField(blank=True, default="<p></p>")),
                ("message_stripped", models.TextField(blank=True, null=True)),
                ("sender", models.CharField(max_length=255)),
                ("read_at", models.DateTimeField(null=True)),
                ("snoozed_till", models.DateTimeField(null=True)),
                ("archived_at", models.DateTimeField(null=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_created_by",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Created By",
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="notifications",
                        to="db.project",
                    ),
                ),
                (
                    "receiver",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="received_notifications",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "triggered_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="triggered_notifications",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_updated_by",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Last Modified By",
                    ),
                ),
                (
                    "workspace",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="notifications",
                        to="db.workspace",
                    ),
                ),
            ],
            options={
                "verbose_name": "Notification",
                "verbose_name_plural": "Notifications",
                "db_table": "notifications",
                "ordering": ("-created_at",),
            },
        ),
        migrations.CreateModel(
            name="IssueSubscriber",
            fields=[
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(
                        auto_now=True, verbose_name="Last Modified At"
                    ),
                ),
                (
                    "id",
                    models.UUIDField(
                        db_index=True,
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_created_by",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Created By",
                    ),
                ),
                (
                    "issue",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="issue_subscribers",
                        to="db.issue",
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="project_%(class)s",
                        to="db.project",
                    ),
                ),
                (
                    "subscriber",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="issue_subscribers",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_updated_by",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Last Modified By",
                    ),
                ),
                (
                    "workspace",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="workspace_%(class)s",
                        to="db.workspace",
                    ),
                ),
            ],
            options={
                "verbose_name": "Issue Subscriber",
                "verbose_name_plural": "Issue Subscribers",
                "db_table": "issue_subscribers",
                "ordering": ("-created_at",),
                "unique_together": {("issue", "subscriber")},
            },
        ),
    ]
