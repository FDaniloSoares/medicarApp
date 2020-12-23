from apps.scheduling.models import Especialidade, Medico, Agenda, Consulta
from rest_framework import serializers


class EspecialidadeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Especialidade
        fields = ["id", "nome"]


class MedicoSerializer(serializers.HyperlinkedModelSerializer):
    especialidade = EspecialidadeSerializer()

    class Meta:
        model = Medico
        fields = ["id", "crm", "nome", "especialidade"]


class AgendaSerializer(serializers.HyperlinkedModelSerializer):
    medico = MedicoSerializer()

    class Meta:
        model = Agenda
        fields = ["id", "medico", "dia", "horarios"]


class ConsultaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()

    class Meta:
        model = Consulta
        fields = ['id', 'dia', 'horario', 'data_agendamento', 'medico']

class CreateConsultaSerializer(serializers.Serializer):
    agenda_id = serializers.IntegerField(min_value=1)
    horario = serializers.TimeField()
    user = serializers.IntegerField(min_value=1)

    def create(self, validated_data):
        agenda = Agenda.objects.get( id = validated_data['agenda_id']) 
        consulta = Consulta(user_id=validated_data['user'], dia=agenda.dia, horario=validated_data['horario'], medico_id=agenda.medico_id)
        consulta.save()
        return consulta


    

