# Generated by Django 5.0.3 on 2024-03-27 09:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Benefeiciary',
            new_name='Beneficiary',
        ),
        migrations.RenameField(
            model_name='bank_account',
            old_name='benefeiciary',
            new_name='beneficiary',
        ),
        migrations.RenameField(
            model_name='beneficiary',
            old_name='benefeiciary_id',
            new_name='beneficiary_id',
        ),
    ]