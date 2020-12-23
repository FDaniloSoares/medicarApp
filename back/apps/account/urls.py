from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path
from apps.account import views


urlpatterns = [
    path("create/", views.UserCreateAPIView.as_view(), name="create-user"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
