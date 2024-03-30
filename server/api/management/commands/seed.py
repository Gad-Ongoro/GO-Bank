import argparse
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from faker import Faker
from random import choice as rc
from api import models

fake = Faker()

class Command(BaseCommand):
    help = 'Delete all records and seed database with fake data'

    def add_arguments(self, parser):
        parser.add_argument('num_records', type=int, help='Number of fake records to generate')
        
    def handle(self, *args, **kwargs):
        num_records = kwargs['num_records']
        self.delete_all_records()
        self.seed_data(num_records)
        self.stdout.write(self.style.SUCCESS('Database seeding complete'))
        
    def delete_all_records(self):
        models.User.objects.all().delete()
        
    def seed_data(self, num_records):
        for _ in range(num_records):

            user_instance = models.User(user_name = fake.user_name(), 
                                   email = fake.email(),
                                   role = rc([10, 100, 1000]),
                                   password = make_password(fake.password()),
                                   )
            user_instance.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {num_records} records'))