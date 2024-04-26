from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
import django

from datetime import datetime, timedelta
import pytz

EA_timezone = pytz.timezone('Africa/Nairobi')
current_datetime = datetime.now(EA_timezone)

# Create your models here.
class Branch(models.Model):
    branch_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length = 100)
    location = models.CharField(max_length = 100)
    opening_hours = models.TimeField()
    closing_hours = models.TimeField()
    open_days = models.CharField(max_length = 250)

class Employee(models.Model):
    employee_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    email = models.EmailField(unique = True)
    branch = models.ForeignKey(Branch, on_delete = models.CASCADE)
    
class CustomUser(AbstractUser):
    # Custom fields
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    email = models.EmailField(unique=True)
    role = models.IntegerField(default = 1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    primary_branch = models.ForeignKey(Branch, on_delete = models.CASCADE)

    # Related_name to avoid clashes with built-in User model
    groups = models.ManyToManyField('auth.Group', related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='customuser_set', blank=True)

    def __str__(self):
        return self.username

class Profile(models.Model):
    profile_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length = 50)
    phone_number = models.CharField(max_length = 50)
    backup_mail = models.EmailField(unique = True)
    ID_type = models.CharField(max_length = 100)
    ID_number = models.IntegerField()
    country_of_residence = models.CharField(max_length = 100)
    profile_photo = models.URLField()
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
class Address(models.Model):
    adress_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    street = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length = 100)
    zipcode = models.CharField(max_length = 50)
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)

class Beneficiary(models.Model):
    beneficiary_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length = 100)
    account_number = models.IntegerField()
    relation = models.CharField(max_length = 100)
    email = models.EmailField(unique = True)

    def __str__(self):
        return f'{self.name} {self.email}'

class Bank_Account(models.Model):
    account_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    account_type = models.CharField(max_length = 50)
    account_number = models.IntegerField(unique = True)
    balance = models.DecimalField(max_digits=20, decimal_places=2)
    loan_limit = models.IntegerField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
class Card(models.Model):
    issue_date = current_datetime.strftime('%m/%y')
    expiry_date = current_datetime + timedelta(days=365 * 4)
    exp_date = expiry_date.strftime('%m/%y')

    card_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length = 50)
    card_number = models.IntegerField(unique = True)
    CVV = models.IntegerField()
    date_issued = models.CharField(max_length = 50, default = issue_date)
    expiration_date = models.CharField(max_length = 50, default = exp_date)
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)

class Transaction(models.Model):
    transaction_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length = 50)
    amount = models.IntegerField()
    description = models.CharField(max_length = 200)
    time_stamp = models.DateTimeField(auto_now_add = True)
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)
    beneficiary = models.ForeignKey(Beneficiary, on_delete = models.CASCADE)

class Loan(models.Model):
    loan_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    loan_type = models.CharField(max_length = 50)
    amount = models.IntegerField()
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.PositiveIntegerField(help_text="Loan period in months")
    collateral = models.CharField(max_length = 200)
    status = models.BooleanField(default = False)
    start_date = models.DateField(default = django.utils.timezone.now)
    due_date = models.DateField()
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)

class Loan_Payment(models.Model):
    loan_payment_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    total_paid = models.IntegerField()
    last_pay_amount = models.IntegerField()
    upcoming_pay_amount = models.IntegerField()
    last_pay_date = models.DateTimeField(auto_now = True)
    upcoming_pay_date = models.CharField(max_length = 50)
    balance = models.IntegerField()
    loan = models.ForeignKey(Loan, on_delete = models.CASCADE)
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)