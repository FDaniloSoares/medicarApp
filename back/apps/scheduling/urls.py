from django.urls import path
from . import views
from django.urls import include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"especialidades", views.EspecialidadeViewSet, basename="especialidades")
router.register(r"medicos", views.MedicoViewSet, basename="medicos")
router.register(r"agendas", views.AgendaViewSet, basename="agendas")
#router.register(r"consultas", views.ConsultaViewSet.as_view, basename="consultas")

urlpatterns = [
    path("", include(router.urls)),
    path('consultas/', views.ConsultaViewSet.as_view({ 'get': 'get','post': 'post', })),
    path('consultas/<int:pk>', views.ConsultaViewSet.as_view({ 'delete': 'delete' })),
]

