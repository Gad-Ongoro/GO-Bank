from django.db import models
import uuid

# Create your models here.
class User(models.Model):
    user_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    user_name = models.CharField(max_length=100)
    email = models.EmailField(unique = True)
    role = models.IntegerField(default = 1000)
    password = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user_name

class Profile(models.Model):
    profile_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length = 50)
    phone_number = models.IntegerField()
    backup_mail = models.EmailField(unique = True)
    ID_type = models.CharField(max_length = 100)
    ID_number = models.IntegerField()
    country_of_residence = models.CharField(max_length = 100)
    profile_photo = models.URLField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
class Address(models.Model):
    adress_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    street = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length = 100)
    zipcode = models.CharField(max_length = 50)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    beneficiary = models.ForeignKey(Beneficiary, on_delete = models.CASCADE)
    
class Transaction(models.Model):
    transaction_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length = 50)
    amount = models.IntegerField()
    description = models.CharField(max_length = 200)
    time_stamp = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    bank_account = models.ForeignKey(Bank_Account, on_delete = models.CASCADE)
    beneficiary = models.ForeignKey(Beneficiary, on_delete = models.CASCADE)

class Card(models.Model):
    card_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length = 50)
    card_number = models.IntegerField(unique = True)
    CVV = models.IntegerField()
    date_issued = models.DateField()
    expiration_date = models.DateField()
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    
class Loan(models.Model):
    loan_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    loan_type = models.CharField(max_length = 50)
    amount = models.IntegerField()
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.IntegerField()
    collateral = models.CharField(max_length = 200)
    status = models.BooleanField(default = False)
    start_date = models.DateTimeField(auto_now_add = True)
    due_date = models.DateField()
    user = models.ForeignKey(User, on_delete = models.CASCADE)

class Loan_Payment(models.Model):
    loan_payment_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    last_pay_amount = models.IntegerField()
    upcoming_pay_amount = models.IntegerField()
    last_pay_date = models.DateTimeField(auto_now = True)
    upcoming_pay_date = models.DateField()
    balance = models.IntegerField()
    loan = models.ForeignKey(Loan, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)