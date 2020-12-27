from django.shortcuts import render, get_object_or_404

from copy import copy
from datetime import date
from django.utils import timezone

from apps.account.models import User
from apps.scheduling.models import Especialidade, Medico, Agenda, Consulta
from apps.scheduling.serializers import (
    EspecialidadeSerializer,
    MedicoSerializer,
    AgendaSerializer,
    ConsultaSerializer,
    CreateConsultaSerializer,
)
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response


class EspecialidadeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = EspecialidadeSerializer
    queryset = Especialidade.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["nome"]


class MedicoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = MedicoSerializer
    queryset = Medico.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["nome"]
    filterset_fields = ["especialidade"]


class AgendaViewSet(viewsets.ReadOnlyModelViewSet):
    now = timezone.now()
    serializer_class = AgendaSerializer
    queryset = Agenda.objects.filter(dia__gt=now.date())
    search_fields = ["medico"]


class ConsultaViewSet(viewsets.GenericViewSet):
    def get(self, request):
        now = timezone.now()
        consultas = Consulta.objects.filter(user=request.user, dia__gte=now.date())
        consultas = consultas.order_by("dia", "horario")
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = copy(request.data)
        data.update({"user": request.user.id})
        serializer = CreateConsultaSerializer(data=data)
        if serializer.is_valid():
            agenda = get_object_or_404(
                Agenda, id=serializer.validated_data["agenda_id"]
            )
            for hora in agenda.hora.all():
                if hora.hora == serializer.validated_data["horario"].strftime("%H:%M"):
                    try:
                        Consulta.objects.get(
                            dia=agenda.dia,
                            medico=agenda.medico,
                            horario=serializer.validated_data["horario"],
                        )
                        return Response(
                            {"error": "Medico ja esta com este horario ocupado"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                    except Consulta.DoesNotExist:
                        try:
                            user = User.objects.get(
                                id=serializer.validated_data["user"]
                            )
                            Consulta.objects.get(
                                user=user,
                                dia=agenda.dia,
                                horario=serializer.validated_data["horario"],
                            )
                            return Response(
                                {
                                    "error": "Você ja possui uma consulta neste dia e horario"
                                },
                                status=status.HTTP_400_BAD_REQUEST,
                            )
                        except Consulta.DoesNotExist:
                            consulta = serializer.save()
                            return Response(
                                ConsultaSerializer(consulta).data,
                                status=status.HTTP_201_CREATED,
                            )
            return Response(
                {"error": "Agenda não existe"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = User.objects.get(id=request.user.id)
        try:
            consulta = Consulta.objects.get(user=user, id=pk)
            consulta.delete()
            return Response(status=None)
        except Consulta.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)