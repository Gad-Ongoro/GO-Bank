import argparse
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from faker import Faker
from random import choice as rc, randint as ri
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
        # models.Address.objects.all().delete()
        # models.Profile.objects.all().delete()
        models.User.objects.all().delete()
        
    def seed_data(self, num_records):
        # User
        for _ in range(num_records):
            user_instance = models.User(user_name = fake.user_name(), 
                                   email = fake.email(),
                                   role = rc([10, 100, 1000]),
                                   password = make_password(fake.password()),
                                   )
            user_instance.save()

        # Profile
        for user in models.User.objects.all():
            profile_instance = models.Profile(
                                    first_name = fake.first_name(),
                                    last_name = fake.last_name(),
                                    date_of_birth = fake.date_of_birth(),
                                    gender = rc(['Male', 'Female']),
                                    phone_number = fake.phone_number(),
                                    backup_mail = fake.email(),
                                    ID_type = rc(['National Identity Card', 'Passport', 'Driving Licence', 'Birth Certificate', 'Alien ID', 'Service ID']),
                                    ID_number = ri(100000, 1000000),
                                    country_of_residence = fake.country(),
                                    profile_photo = fake.image_url(),
                                    user = user
                                    )
            profile_instance.save()
            
        # Address
        for user in models.User.objects.all():
            address_instance = models.Address(
                                    street = fake.street_name(),
                                    city = fake.city(),
                                    state = fake.state(),
                                    zipcode = fake.zipcode(),
                                    user = user
                                    )
            address_instance.save()
            
        # Beneficiary
        for user in models.User.objects.all():
            user_instance = models.Beneficiary(
                                    name = fake.name(), 
                                    account_number = fake.credit_card_number(),
                                    relation = rc(['Friends and Family', 'Trust', 'Charity', 'Business Entity', 'Secondary Beneficiary']),
                                    email = fake.email(),
                                    user = user
                                    )
            user_instance.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {num_records} records'))