# Generated by Django 3.1.7 on 2021-05-15 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_course_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='duedate',
            field=models.DateTimeField(null=True),
        ),
    ]
