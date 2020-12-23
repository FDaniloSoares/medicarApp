from django.contrib import admin

# Register your models here.
from apps.account.models import User

admin.site.register(User)
