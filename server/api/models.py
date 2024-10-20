from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid
import django

from datetime import datetime, timedelta
import pytz

EA_timezone = pytz.timezone('Africa/Nairobi')
current_datetime = datetime.now(EA_timezone)

# Create your models here.

# Branch
class Branch(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length = 100)
    location = models.CharField(max_length = 100)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    opening_hours = models.TimeField()
    closing_hours = models.TimeField()
    open_days = models.CharField(max_length = 250)
    # users = models.ManyToManyField('User', through='UserBranch')

# InvestmentAccount
class InvestmentAccount(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField('User', through='UserInvestmentAccount')

    VIEW = 'can_only_read_transactions'
    FULL_CRUD = 'can_crud_transactions'
    POST_ONLY = 'can_only_create_transactions'

    ACCESS_LEVEL = [
        (VIEW, 'Read Only'),
        (FULL_CRUD, 'Full CRUD'),
        (POST_ONLY, 'Create Only'),
    ]

    permission = models.CharField(max_length=50, choices=ACCESS_LEVEL)

    class Meta:
        permissions = [
            ("can_only_read_transactions", "Can only view transactions"),
            ("can_crud_transactions", "Can CRUD transactions"),
            ("can_only_create_transactions", "Can only create transactions"),
        ]

    def __str__(self):
        return self.name

# User
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    ROLE_CHOICES = (
        (10, 'Admin'),
        (100, 'Employee'),
        (1000, 'User'),
    )
    role = models.IntegerField(choices=ROLE_CHOICES, default=1000)
    username = None
    primary_branch = models.ForeignKey(Branch, on_delete = models.CASCADE, blank=True, null=True)
    investment_accounts = models.ManyToManyField(
        InvestmentAccount,
        through='UserInvestmentAccount',
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

# User & InvestmentAccount association table
class UserInvestmentAccount(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    investment_account = models.ForeignKey(InvestmentAccount, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'investment_account']

    def __str__(self):
        return f'{self.user} - {self.investment_account}'

# Transactions
class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='transactions')
    investment_account = models.ForeignKey('InvestmentAccount', on_delete=models.CASCADE, related_name='transactions', null=True, blank=True)
    bank_account = models.ForeignKey('Bank_Account', on_delete = models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    beneficiary = models.ForeignKey('Beneficiary', on_delete = models.CASCADE)
    amount = models.IntegerField()
    status = models.CharField(max_length=20, default='Pending')
    result_description = models.TextField(null=True, blank=True)
    receipt_number = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    transaction_type = models.CharField(max_length=10, choices=[('credit', 'Deposit'), ('debit', 'Withdrawal')])

    def __str__(self):
        return f'{self.user} - {self.account} - {self.amount} - {self.transaction_type}'

    @property
    def is_credit(self):
        return self.transaction_type == 'credit'

    @property
    def is_debit(self):
        return self.transaction_type == 'debit'

# Profile
class Profile(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length = 50)
    phone_number = models.CharField(max_length = 50)
    backup_mail = models.EmailField(unique = True)
    ID_type = models.CharField(max_length = 100)
    ID_number = models.IntegerField()
    country_of_residence = models.CharField(max_length = 100)
    profile_photo = models.URLField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.backup_mail}'

# Address
class Address(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    street = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length = 100)
    zipcode = models.CharField(max_length = 50)
    user = models.ForeignKey(User, on_delete = models.CASCADE)

# Beneficiary
class Beneficiary(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length = 100)
    account_number = models.IntegerField()
    relation = models.CharField(max_length = 100)
    email = models.EmailField(unique = True)

    def __str__(self):
        return f'{self.name} {self.email}'

class Bank_Account(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    account_type = models.CharField(max_length = 50)
    account_number = models.IntegerField(unique = True)
    balance = models.DecimalField(max_digits=20, decimal_places=2)
    loan_limit = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Card(models.Model):
    issue_date = current_datetime.strftime('%m/%y')
    expiry_date = current_datetime + timedelta(days=365 * 4)
    exp_date = expiry_date.strftime('%m/%y')

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length = 50)
    card_number = models.IntegerField(unique = True)
    CVV = models.IntegerField()
    date_issued = models.CharField(max_length = 50, default = issue_date)
    expiration_date = models.CharField(max_length = 50, default = exp_date)
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)

class Loan(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
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
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    total_paid = models.IntegerField()
    last_pay_amount = models.IntegerField()
    upcoming_pay_amount = models.IntegerField()
    last_pay_date = models.DateTimeField(auto_now = True)
    upcoming_pay_date = models.CharField(max_length = 50)
    balance = models.IntegerField()
    loan = models.ForeignKey(Loan, on_delete = models.CASCADE)
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)