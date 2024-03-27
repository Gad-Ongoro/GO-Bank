from django.urls import path
from . import views

urlpatterns = [
    # Users
    path('users/', views.Users_ListCreateApiView.as_view(), name='users_list'),
    path('users/<uuid:pk>/', views.User_Detail_APIView.as_view(), name='user_detail')
]