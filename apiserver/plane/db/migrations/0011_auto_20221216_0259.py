# Generated by Django 3.2.14 on 2022-12-15 21:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0010_auto_20221213_2348'),
    ]

    operations = [
        migrations.CreateModel(
            name='Module',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Last Modified At')),
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=255, verbose_name='Module Name')),
                ('description', models.TextField(blank=True, verbose_name='Module Description')),
                ('description_text', models.JSONField(blank=True, null=True, verbose_name='Module Description RT')),
                ('description_html', models.JSONField(blank=True, null=True, verbose_name='Module Description HTML')),
                ('start_date', models.DateField(null=True)),
                ('target_date', models.DateField(null=True)),
                ('status', models.CharField(choices=[('backlog', 'Backlog'), ('planned', 'Planned'), ('in-progress', 'In Progress'), ('paused', 'Paused'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='planned', max_length=20)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='module_created_by', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('lead', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='module_leads', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Module',
                'verbose_name_plural': 'Modules',
                'db_table': 'module',
                'ordering': ('-created_at',),
            },
        ),
        migrations.AddField(
            model_name='project',
            name='icon',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='ModuleMember',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Last Modified At')),
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='modulemember_created_by', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.module')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_modulemember', to='db.project')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='modulemember_updated_by', to=settings.AUTH_USER_MODEL, verbose_name='Last Modified By')),
                ('workspace', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workspace_modulemember', to='db.workspace')),
            ],
            options={
                'verbose_name': 'Module Member',
                'verbose_name_plural': 'Module Members',
                'db_table': 'module_member',
                'ordering': ('-created_at',),
                'unique_together': {('module', 'member')},
            },
        ),
        migrations.AddField(
            model_name='module',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='module_members', through='db.ModuleMember', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='module',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_module', to='db.project'),
        ),
        migrations.AddField(
            model_name='module',
            name='updated_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='module_updated_by', to=settings.AUTH_USER_MODEL, verbose_name='Last Modified By'),
        ),
        migrations.AddField(
            model_name='module',
            name='workspace',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workspace_module', to='db.workspace'),
        ),
        migrations.CreateModel(
            name='ModuleIssue',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Last Modified At')),
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='moduleissue_created_by', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='module_issues', to='db.issue')),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='module_issues', to='db.module')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_moduleissue', to='db.project')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='moduleissue_updated_by', to=settings.AUTH_USER_MODEL, verbose_name='Last Modified By')),
                ('workspace', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workspace_moduleissue', to='db.workspace')),
            ],
            options={
                'verbose_name': 'Module Issue',
                'verbose_name_plural': 'Module Issues',
                'db_table': 'module_issues',
                'ordering': ('-created_at',),
                'unique_together': {('module', 'issue')},
            },
        ),
        migrations.AlterUniqueTogether(
            name='module',
            unique_together={('name', 'project')},
        ),
    ]
