from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("", include(("apps.scheduling.urls", "scheduling"), namespace="scheduling")),
    path("account/", include(("apps.account.urls", "account"), namespace="account")),
    path("admin/", admin.site.urls),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
]