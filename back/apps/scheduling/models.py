from django.db import models

# Create your models here.
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.conf import settings
from datetime import datetime


class Especialidade(models.Model):

    nome = models.CharField("Nome", max_length=100)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "Especialidade"
        verbose_name_plural = "Especialidades"


class Medico(models.Model):

    nome = models.CharField("Nome", max_length=120)
    crm = models.PositiveIntegerField("CRM", unique=True)
    email = models.EmailField("E-mail", blank=True, null=True)
    telefone = models.IntegerField("Telefone", blank=True, null=True)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "Medico"
        verbose_name_plural = "Medicos"


class Hora(models.Model):

    HORAS = [
        ("08:00", "08:00"),
        ("09:00", "09:00"),
        ("10:00", "10:00"),
        ("11:00", "11:00"),
        ("12:00", "12:00"),
        ("14:00", "14:00"),
        ("15:00", "15:00"),
        ("16:00", "16:00"),
        ("17:00", "17:00"),
        ("18:00", "18:00"),
    ]

    hora = models.CharField(choices=HORAS, unique=True, max_length=5)

    def __str__(self):
        return self.hora

    class Meta:
        verbose_name = "Hora"
        verbose_name_plural = "Horas"


class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    dia = models.DateField("Dia", null=True,)
    hora = models.ManyToManyField(Hora, related_name="horas")

    def clean(self):
        hoje = timezone.now().date()

        if self.dia < hoje:
            raise ValidationError("Não se pode fazer agenda para dias passados")

        if (Agenda.objects.filter(medico=self.medico).exists()) and Agenda.objects.filter(dia=self.dia).exists():
            raise ValidationError("Ja EXISTE uma agenda para este médico nesta data")

        if self.dia == hoje:
            raise ValidationError("Agendamento apenas com um dia de antecendência")

    def horarios(self):
        return ", ".join([str(p) for p in self.hora.all()])

    class Meta:
        verbose_name = "Agenda"
        verbose_name_plural = "Agendas"


class Consulta(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name="Usuario", related_name="consultas", on_delete=models.CASCADE
    )
    dia = models.DateField()
    horario = models.TimeField()
    data_agendamento = models.DateTimeField("Agendado em", auto_now_add=True)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Consulta"
        verbose_name_plural = "Consultas"
