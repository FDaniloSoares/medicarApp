import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from '../../../shared/services/message.service';
import { Appointment } from '../../appointment.model';
import { AppointmentService } from '../../appointment.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
})
export class SchedulingComponent implements OnInit {
  especialidades = [];

  existeMedico: boolean = false;

  medicos = [];

  existeData: boolean = false;

  datas = [];

  existeHora: boolean = false;

  horas = [];

  ativarBotaoFormulario: boolean = false;

  agenda_id: number;

  horario: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private appointmentService: AppointmentService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.getEspecialidades();
  }

  gerarForm() {
    this.form = this.fb.group({
      especialidade: new FormControl('', [Validators.required]),
      medico: new FormControl({ value: '', disabled: true }, [Validators.required]),
      data: new FormControl({ value: '', disabled: true }, [Validators.required]),
      hora: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }

  getEspecialidades() {
    this.appointmentService.getEspecialidades()
      .subscribe(
        (especialidade) => {
          this.especialidades = this.filterAndSort(especialidade);
        },
        (err) => {
          this.showErrors(err);
        },
      );
  }

  onChangeEspecialidade(especialidade) {
    if (especialidade) {
      this.appointmentService.getMedicos(especialidade)
        .subscribe(
          (medicos) => {
            this.medicos = this.filterAndSort(medicos);
            if (!this.ativarBotaoFormulario) {
              this.existeMedico = true;
              this.form.controls.medico.enable();
            } else {
              this.form.get('medico').setValue(this.medicos[0]);
              this.atualizaDados('data');
            }
          },
          (err) => {
            this.showErrors(err);
          },
        );
    }
  }

  onChangeMedico(medico) {
    if (medico) {
      this.appointmentService.getDatas(medico)
        .subscribe(
          (datas) => {
            this.datas = datas.map((data) => data.split('-').reverse().join('/'));
            if (!this.ativarBotaoFormulario) {
              this.existeData = true;
              this.form.controls.data.enable();
            } else {
              this.form.get('data').setValue(this.datas[0]);
              this.atualizaDados('hora');
            }
          },
          (err) => {
            this.showErrors(err);
          },
        );
    }
  }

  onChangeData(data) {
    if (data) {
      const dia:string = data.split('/').reverse().join('-');
      this.appointmentService.getHoras(dia, this.form.get('medico').value)
        .subscribe(
          (horas) => {
            this.horas = horas.toString().split(', ');
            if (!this.ativarBotaoFormulario) {
              this.existeHora = true;
              this.form.controls.hora.enable();
            } else {
              this.form.get('hora').setValue(this.horas[0]);
              this.atualizaDados('agenda');
            }
          },
          (err) => {
            this.showErrors(err);
          },
        );
    }
  }

  onChangeHora(hora) {
    if (hora) {
      const dia:string = this.form.get('data').value.split('/').reverse().join('-');
      this.appointmentService.getagenda_id(dia, this.form.get('medico').value)
        .subscribe(
          (agenda_id) => {
            this.agenda_id = parseInt(agenda_id, 10);
            this.ativarBotaoFormulario = true;
            this.horario = hora;
          },
          (err) => {
            this.showErrors(err);
          },
        );
    }
  }

  agendar() {
    const appointment: Appointment = {
      agenda_id: this.agenda_id,
      horario: this.horario,
    };
    this.appointmentService.agendar(appointment)
      .subscribe(
        (data) => {
          const title: string = 'Agendamento Efetuado com Sucesso!!!';
          this.messageService.showSuccess('', title);
          this.router.navigate(['/consultas']);
        },
        (err) => {
          console.log(err)
          if (err.status === 400) {
            const title: string = 'Agenda Indisponivel';
            const msg: string = err.error.error;
            this.messageService.showWarning(msg, title);
          } else {
            const title: string = 'Erro Inesperado';
            const msg: string = 'Por favor, tente novamente em instantes';
            this.messageService.showWarning(msg, title);
          }
        },
      );
  }

  atualizaDados(etapa:string) {
    switch (etapa) {
      case 'data':
        this.appointmentService.getDatas(this.medicos[0])
          .subscribe(
            (datas) => {
              this.datas = datas.map((data) => data.split('-').reverse().join('/'));
              this.form.get('data').setValue(this.datas[0]);
              this.atualizaDados('hora');
            },
            (err) => {
              this.showErrors(err);
            },
          );
        break;
      case 'hora':
        this.appointmentService.getHoras(
          (this.form.get('data').value).split('/').reverse().join('-'),
          this.form.get('medico').value,
        )
          .subscribe(
            (horas) => {
              this.horas = horas.toString().split(', ');
              this.form.get('hora').setValue(this.horas[0]);
              this.atualizaDados('agenda');
            },
            (err) => {
              this.showErrors(err);
            },
          );
        break;
      case 'agenda':
        this.appointmentService.getagenda_id(
          (this.form.get('data').value).split('/').reverse().join('-'),
          this.form.get('medico').value,
        )
          .subscribe(
            (agenda_id) => {
              this.agenda_id = parseInt(agenda_id, 10);
              this.horario = this.form.get('hora').value;
            },
            (err) => {
              this.showErrors(err);
            },
          );
        break;
      default:
    }
  }

  showErrors(err) {
    const title: string = 'Erro Inesperado';
    const msg: string = 'Por favor, tente novamente em instantes';
    this.messageService.showWarning(msg, title);
  }

  // Elimina repetição e coloca em ordem alfebetica
  filterAndSort(array: any[]) {
    const seen = {};
    return array.sort().filter((item) => (
      seen.hasOwnProperty(item) ? false : (seen[item] = true)));
  }
}
