from django.core.management.base import BaseCommand, CommandError
from apps.scheduling.models import Especialidade, Medico, Hora, Agenda
from datetime import datetime

import json

class Command(BaseCommand):
    help = 'Populating Data'

    def add_arguments(self, parser):
        parser.add_argument('path', type=str, help="file path")
    
    def handle(self, *args, **options):

        file_path = options['path']
        with open(file_path, 'r') as json_file:
            jsonreader = json.load(json_file)

            for especialidade in jsonreader['especialidade']:
                esp, ctd = Especialidade.objects.get_or_create(nome=especialidade)
            
            for medico in jsonreader['medico']:
                med, ctd = Medico.objects.get_or_create(nome=medico['nome'], crm=medico['crm'], especialidade=Especialidade.objects.get(nome=medico['especialidade']))

            for hora in jsonreader['hora']:
                hr, ctd = Hora.objects.get_or_create(hora=hora)

            for agenda in jsonreader['agenda']:
                horarios = agenda['horarios']
                date_str = agenda['dia']
                temp_date = datetime.strptime(date_str, "%Y-%m-%d").date()
                agd, ctd = Agenda.objects.get_or_create(medico=Medico.objects.get(crm=agenda['medico_crm']), dia=temp_date)
                for hr in horarios:
                    try:
                        pk = Hora.objects.get(hora=hr)
                        agd.hora.add(pk.id)
                    except:
                        print('Hora não especificada corretamente')
                agd.save()
