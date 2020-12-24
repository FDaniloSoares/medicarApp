from django.core.management.base import BaseCommand, CommandError
from apps.scheduling.models import Especialidade, Medico

import json

class Command(BaseCommand):
    help = 'Populating Especialidades'

    def add_arguments(self, parser):
        parser.add_argument('path', type=str, help="file path")
    
    def handle(self, *args, **options):

        file_path = options['path']
        with open(file_path, 'r') as json_file:
            jsonreader = json.load(json_file)

            for especialidade in jsonreader['especialidade']:
                esp, ctd = Especialidade.objects.get_or_create(nome = especialidade)
            
            for medico in jsonreader['medico']:
                med, ctd = Medico.objects.get_or_create(nome = medico['nome'], crm=medico['crm'],especialidade = Especialidade.objects.get(nome=medico['especialidade']))