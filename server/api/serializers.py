from rest_framework import serializers
from . import models

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Branch
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    branch = BranchSerializer()
    class Meta:
        model = models.Employee
        fields = '__all__'
        
class CustomUserSerializer(serializers.ModelSerializer):
    # primary_branch = BranchSerializer()

    class Meta:
        model = models.CustomUser
        fields = ['id', 'username', 'email', 'role', 'password', 'created_at', 'updated_at', 'primary_branch']
        extra_kwargs = {
            'password': {'write_only': True},
        }
        
    # def create(self, validated_data):
    #     primary_branch_data = validated_data.pop('primary_branch')
    #     primary_branch = models.Branch.objects.create(**primary_branch_data)
    #     user = models.CustomUser.objects.create(primary_branch=primary_branch, **validated_data)
    #     return user

    def create(self, validated_data):
        print(validated_data)
        user = models.CustomUser.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        primary_branch_data = validated_data.pop('primary_branch', None)
        if primary_branch_data:
            primary_branch = instance.primary_branch
            for key, value in primary_branch_data.items():
                setattr(primary_branch, key, value)
            primary_branch.save()
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

# class UserSerializer(serializers.ModelSerializer):
#     # primary_branch = BranchSerializer()
#     class Meta:
#         model = models.User
#         fields = '__all__'
        
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