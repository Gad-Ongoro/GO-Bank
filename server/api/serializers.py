from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password', ]
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         print(validated_data)
#         user = User.objects.create_user(**validated_data)
#         return user

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Branch
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    branch = BranchSerializer()
    class Meta:
        model = models.Employee
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    # primary_branch = BranchSerializer()
    class Meta:
        model = models.User
        fields = '__all__'
        
class ProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = models.Profile
        fields = '__all__'
        
class AddressSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = models.Address
        fields = '__all__'
        
class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Beneficiary
        fields = '__all__'
        
class BankAccountSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = models.Bank_Account
        fields = '__all__'
        
class TransactionSerializer(serializers.ModelSerializer):
    bank_account = BankAccountSerializer()
    # beneficiary = BeneficiarySerializer()
    class Meta:
        model = models.Transaction
        fields = '__all__'
        
class CardSerializer(serializers.ModelSerializer):
    bank_account = BankAccountSerializer()
    class Meta:
        model = models.Card
        fields = '__all__'
        
class LoanSerializer(serializers.ModelSerializer):
    # bank_account = BankAccountSerializer()
    class Meta:
        model = models.Loan
        fields = '__all__'

class LoanPaymentSerializer(serializers.ModelSerializer):
    loan = LoanSerializer()
    # bank_account = BankAccountSerializer()
    class Meta:
        model = models.Loan_Payment
        fields = '__all__'