# Generated by Django 3.1.7 on 2021-05-16 14:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_task_duedate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='matkul',
            new_name='title',
        ),
    ]