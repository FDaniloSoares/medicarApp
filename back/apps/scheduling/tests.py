from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.scheduling.models import Agenda, Consulta, Medico, Especialidade, Hora
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class ConsultasTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.especialidade = Especialidade.objects.create(nome='Pediadria')
        cls.medico = Medico.objects.create(nome='John', crm='12345', especialidade=cls.especialidade)
        cls.hora = Hora.objects.create(hora="14:00")
        cls.agenda = Agenda.objects.create(medico=cls.medico, dia='2021-01-01')
        cls.agenda.hora.add(cls.hora)
        cls.user = User.objects.create(name='John Cena')


    def test_create_consulta(self):
        url = reverse("scheduling:consultas")
        data = {"agenda_id": 1, "horario": "14:00"}
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Consulta.objects.count(), 1)
        self.assertEqual(Consulta.objects.get().user, self.user)
        self.assertEqual(str(Consulta.objects.get().dia), self.agenda.dia)
        self.assertEqual(Consulta.objects.get().horario.strftime("%H:%M"), data["horario"])
        self.assertTrue(Consulta.objects.get().data_agendamento)
        self.assertEqual(Consulta.objects.get().medico, self.medico)
        print(response.data)


