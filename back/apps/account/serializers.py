from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['name', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            name=validated_data['name'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user