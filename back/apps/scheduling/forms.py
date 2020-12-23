from django import forms
from scheduling.models import Hora


class AgendaForm(forms.ModelForm):

    Horarios = forms.ModelMultipleChoiceField(
        queryset=Hora.objects, widget=forms.CheckboxSelectMultiple(), required=True
    )
