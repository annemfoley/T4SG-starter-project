# Generated by Django 3.1.6 on 2021-02-22 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_auto_20210222_1054'),
    ]

    operations = [
        migrations.CreateModel(
            name='Labels',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_sensitive', models.BooleanField(default=False)),
                ('on_hold', models.BooleanField(default=False)),
                ('low_energy', models.BooleanField(default=False)),
            ],
        ),
    ]
