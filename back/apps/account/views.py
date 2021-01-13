from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from apps.account.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.filter(is_superuser=False)
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        if " " in request.data["username"]:
            return Response(
                {"error": "Login não pode conter espaço vazio"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            User.objects.get(username=request.data["username"])

            return Response(
                {"error": "Ja existe usuario com este login"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except User.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED, headers=headers
            )
