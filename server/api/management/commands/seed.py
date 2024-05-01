import argparse
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from faker import Faker
from random import choice as rc, randint as ri
from api import models
from datetime import datetime, timedelta
import pytz

fake = Faker()

EA_timezone = pytz.timezone('Africa/Nairobi')
current_datetime = datetime.now(EA_timezone)
current_date = current_datetime.strftime('%Y-%m-%d')
current_time = current_datetime.strftime('%H%M%S')

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
        models.Branch.objects.all().delete()
        models.CustomUser.objects.all().delete()
        
    def seed_data(self, num_records):
        # Branches
        branches = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Naivasha']
        # for branch in branches:
        for _ in range(num_records):
            branch_instance  = models.Branch(
                name = f"{rc(branches)} GO_Bank Branch",
                location = rc(branches),
                opening_hours = '08:00',
                closing_hours = '16:00',
                open_days = 'Monday - Saturday'
            )
            branch_instance.save()
            
        # Employees
        for branch in models.Branch.objects.all():
            employee_instance = models.Employee(
                first_name = fake.first_name(),
                last_name = fake.last_name(),
                email = fake.email(),
                branch = branch
            )
            employee_instance.save()
 
        # User
        for branch in models.Branch.objects.all():
            user_instance = models.CustomUser(
                username = fake.user_name(), 
                email = fake.email(),
                role = rc([10, 100, 1000]),
                password = make_password(fake.password()),
                primary_branch = branch
            )
            user_instance.save()

        # Profile
        for user in models.CustomUser.objects.all():
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
        for user in models.CustomUser.objects.all():
            address_instance = models.Address(
                street = fake.street_name(),
                city = fake.city(),
                state = fake.state(),
                zipcode = fake.zipcode(),
                user = user
            )
            address_instance.save()
            
        # Beneficiary
        for _ in range(num_records):
            user_instance = models.Beneficiary(
                name = fake.name(), 
                account_number = fake.credit_card_number(),
                relation = rc(['Friends and Family', 'Trust', 'Charity', 'Business Entity', 'Secondary Beneficiary']),
                email = fake.email(),
            )
            user_instance.save()

        # Bank_Account
        for user in models.CustomUser.objects.all():
            bank_account_instance = models.Bank_Account(
                account_type = rc(['Personal', 'Corporate', 'Savings', 'Joint', 'Retirement', 'Student']),
                account_number = fake.credit_card_number(),
                balance = ri(100, 10000000),
                loan_limit = ri(1000, 1000000),
                user = user
            )
            bank_account_instance.save()
            
        # Card
        for account in models.Bank_Account.objects.all():
            card_instance = models.Card(
                type = rc(['Debit Card', 'Credit Card']),
                card_number = fake.credit_card_number(),
                CVV = fake.credit_card_security_code(),
                bank_account = rc([account for account in models.Bank_Account.objects.all()])
            )
            card_instance.save()

        # Transaction
        for account in models.Bank_Account.objects.all():
            transaction_type = rc(['Deposit', 'Withdrawal', 'Transfer', 'Payment', 'Loan', 'Investment', 'Foreign Exchange', 'Cash Management', 'Trade Finance', 'Treasury Service'])
            transaction_instance = models.Transaction(
                type = transaction_type,
                amount = ri(100, 500000),
                description = transaction_type,
                bank_account = account,
                beneficiary = rc([beneficiary for beneficiary in models.Beneficiary.objects.all()])
            )
            transaction_instance.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {num_records} records'))

        # Loan
        for account in models.Bank_Account.objects.all():
            type = rc(['Personal Loan', 'Mortgage', 'Auto Loan', 'Student Loan', 'Small Business Loan', 'Commercial Loan', 'Construction Loan', 'Bridge Loan'])
            period = ri(1, 12)
            start = datetime.now() - timedelta(days=90)
            due_date = start + timedelta(days=30 * period)
            loan_instance = models.Loan(
                loan_type = type,
                amount = ri(5000, 2000000),
                interest_rate = ri(5, 12),
                duration = period,
                collateral = type,
                # status = rc([True, False]),
                status = True if due_date > datetime.now() else False,
                bank_account = account,
                start_date = start,
                due_date = due_date
            )
            loan_instance.save()

        # Loan_Payment
        for loan in models.Loan.objects.all():
            to_be_paid = loan.amount + (loan.amount * loan.interest_rate/100)
            paid_back = to_be_paid * 2/(loan.duration)
            loan_payment_instance = models.Loan_Payment(
                total_paid = paid_back,
                last_pay_amount = paid_back / 2,
                upcoming_pay_amount = paid_back / 2,
                last_pay_date = None,
                upcoming_pay_date = (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d') if loan.status == True else '0000-00-00',
                balance = loan.amount - paid_back,
                loan = loan,
                bank_account = loan.bank_account
            )
            loan_payment_instance.save()