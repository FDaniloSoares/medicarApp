Medicar
========

Prerequisitos
  For run as development:
    - Docker ( sugestion: version 20.10.01)
    - Docker Compose ( sugestion: version 1.27.4) 


Comando Basico
  No diretorio principal execute o comando
    - docker-compose up
  Veja o Client em 
    - http://localhost:3000
  Veja o backend/API em 
    - http://localhost:8000

OBS:
  Ao executar a aplicação por meio do Docker, automaticamente um super Usuario é criado e uma prepopulação do banco e realizada


Sem Docker:
  Back: Na Pasta 'back' instalar dependecias do python e django e executar python manage.py runserver

  Front: Na pasta 'front' instalar os pacotes com 'npm install' e efetuar 'npm run dev'