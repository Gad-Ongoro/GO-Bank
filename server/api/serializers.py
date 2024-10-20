from rest_framework import serializers
from . import models

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Branch
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'password', 'date_joined', 'updated_at', 'primary_branch']
        extra_kwargs = {
            'password': {'write_only': True},
            # 'role': {'read_only': True},
            'date_joined': {'read_only': True},
        }

    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
        
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