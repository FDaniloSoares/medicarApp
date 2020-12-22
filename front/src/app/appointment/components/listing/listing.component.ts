import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutService, HttpUtilService } from '../../../shared/services';
import { MessageService } from '../../../shared/services/message.service';
import { AppointmentService } from '../../appointment.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  usuario : string;

  existeConsulta: boolean = false;

  consultas=[];

  consultaId: string;

  constructor(
    private appointmentService: AppointmentService,
    private messageService: MessageService,
    private logoutService: LogoutService,
    private router: Router,
    private httpUtil: HttpUtilService,
  ) { }

  ngOnInit(): void {
    this.listarConsultas();
  }

  logout() {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }

  deleteConsulta(consultaId: number) {
    this.consultaId = consultaId.toString();
    this.appointmentService.deletarConsultas(this.consultaId)
      .subscribe(
        () => {
          const msg: string = 'Consulta desmarcada!!!';
          this.messageService.showWarning(msg, 'OK');
          this.listarConsultas();
        },
        (err) => {
          const msg: string = 'Houve um problema!!!';
          this.messageService.showWarning(msg, 'OPsss!!!');
        },
      );
  }

  listarConsultas() {
    this.usuario = this.httpUtil.obterNomeUsuario();
    this.appointmentService.listarConsultas()
      .subscribe(
        (data) => {
          this.consultas = data;
          if (this.consultas.length === 0) {
            this.existeConsulta = false;
          } else {
            this.existeConsulta = true;
          }
        },
        (err) => {
          if (this.consultas.length > 0) {
            if (err.status === 403) {
              const title: string = 'Não Autorizado';
              this.messageService.showWarning('', title);
            } else {
              const title: string = 'Erro obtendo Consultas';
              this.messageService.showWarning('', title);
            }
          }
        },
      );
  }
}
