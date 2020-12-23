from django.contrib import admin
from .models import Especialidade, Medico, Agenda, Hora, Consulta


class EspecialidadeAdmin(admin.ModelAdmin):
    list_display = ("id", "nome")
    list_display_links = ("id", "nome")
    search_fields = ("nome", None)


@admin.register(Agenda)
class AgendaAdmin(admin.ModelAdmin):
    list_display = ("medico", "dia", "horarios")
    list_display_links = ("medico",)


admin.site.register(Especialidade, EspecialidadeAdmin)
admin.site.register(Medico)
admin.site.register(Hora)

admin.site.register(Consulta)

