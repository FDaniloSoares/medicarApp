from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.account.models import User


class AccountTests(APITestCase):
    def test_create_user(self):
        url = reverse("account:create-user")
        data = {"name": "John Tester", "username": "john", "password": "123"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get()
        self.assertEqual(user.name, data["name"])
        self.assertEqual(user.username, data["username"])