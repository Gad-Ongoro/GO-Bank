from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from . import models
from . import serializers
from datetime import datetime, timedelta
from django.urls import reverse_lazy

# Create your views here.
""" USERS """
class Users_ListCreateApiView(generics.ListCreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    
class User_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    
""" PROFILES """
class Profile_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    
class Profile_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    
""" ADDRESSES """
class Address_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer
    
class Address_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer
    
""" BENEFICIARIES """
class Beneficiary_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Beneficiary.objects.all()
    serializer_class = serializers.BeneficiarySerializer
    
class Beneficiary_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Beneficiary.objects.all()
    serializer_class = serializers.BeneficiarySerializer
    
""" BANK_ACCOUNTS """
class Bank_Account_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Bank_Account.objects.all()
    serializer_class = serializers.BankAccountSerializer
    
class Bank_Account_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Bank_Account.objects.all()
    serializer_class = serializers.BankAccountSerializer
    
""" TRANSACTIONS """
class Transaction_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer
    
class Transaction_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer
    
""" CARDS """
class Card_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Card.objects.all()
    serializer_class = serializers.CardSerializer
    
class Card_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Card.objects.all()
    serializer_class = serializers.CardSerializer

""" LOANS """
class Loan_ListAPIView(generics.ListAPIView):
    queryset = models.Loan.objects.all()
    serializer_class = serializers.LoanSerializer

class Loan_CreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.LoanSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            loan = serializer.save()
            loan.due_date = loan.start_date + timedelta(days=30 * loan.duration)
            loan.save()
            
            # Return success response with created object data
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Loan_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Loan.objects.all()
    serializer_class = serializers.LoanSerializer
    
""" LOAN_PAYMENTS """
class Loan_Payment_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = models.Loan_Payment.objects.all()
    serializer_class = serializers.LoanPaymentSerializer
    
class Loan_Payment_Detail_APIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Loan_Payment.objects.all()
    serializer_class = serializers.LoanPaymentSerializer