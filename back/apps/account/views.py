from django.contrib.auth import authenticate, get_user_model, login
from django.shortcuts import redirect, render
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from apps.account.forms import RegisterForm
from apps.account.serializers import UserSerializer

User = get_user_model()


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.filter(is_superuser=False)
    permission_classes = [AllowAny]
    authentication_classes = []


def register(request):
    template_name = "register.html"
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            user = authenticate(username=request.POST["username"], password=request.POST["password1"])
            login(request, user)
            return redirect("/")
    else:
        form = RegisterForm()
    context = {"form": form}
    return render(request, template_name, context)
