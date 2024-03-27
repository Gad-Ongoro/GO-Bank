from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
        
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Profile
        fields = '__all__'
        
class AddressSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Address
        fileds = '__all__'
        
class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Beneficiary
        fileds = '__all__'
        
class BankAccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    beneficiary = BeneficiarySerializer()
    class Meta:
        model = models.Bank_Account
        fileds = '__all__'
        
class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    bank_account = BankAccountSerializer()
    beneficiary = BeneficiarySerializer()
    class Meta:
        model = models.Transaction
        fileds = '__all__'
        
class CardSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Card
        fileds = '__all__'
        
class LoanSerializer():
    user = UserSerializer()
    class Meta:
        model = models.Loan
        fileds = '__all__'
        
class LoanPaymentSerializer():
    loan = LoanSerializer()
    user = UserSerializer()
    class Meta:
        model = models.Loan_Payment
        fileds = '__all__'