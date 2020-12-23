/* eslint-disable dot-notation */
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  filter, map, forEach, mergeMap, every,
} from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Appointment } from './appointment.model';

@Injectable()
export class AppointmentService {
    private readonly PATH_AGENDAS: string = 'agendas/';

    private readonly PATH_CONSULTAS: string = 'consultas/';

    constructor(
        private http: HttpClient,
        private httpUtil: HttpUtilService,
    ) { }

    agendar(appointment: Appointment): Observable<any> {
      return this.http.post(
        env.baseApiURL + this.PATH_CONSULTAS,
        appointment,
        this.httpUtil.headers(),
      );
    }

    getEspecialidades(): Observable<any> {
      return this.http.get(
        env.baseApiURL + this.PATH_AGENDAS, this.httpUtil.headers(),
      ).pipe(
        map((response: any[]) => response.results.map((res: any[]) => ({
          ...res.medico.especialidade,
        })).map((especialidade: any[]) => especialidade.nome)),
      );
    }

    getMedicos(especialidade: string): Observable<any> {
      return this.http.get(
        env.baseApiURL + this.PATH_AGENDAS, this.httpUtil.headers(),
      ).pipe(
        map((response: any[]) => response.results
          .map((respo: any[]) => ({
            ...respo.medico,
          })).filter((resp: any[]) => resp.especialidade.nome === especialidade)
          .map((medico: any[]) => medico.nome)),
      );
    }

    getDatas(medico: string): Observable<any> {
      return this.http.get(
        env.baseApiURL + this.PATH_AGENDAS, this.httpUtil.headers(),
      ).pipe(
        map((response: any[]) => response.results
          .map((respo: any[]) => ({
            ...respo,
          }))
          .filter((resp: any[]) => resp.medico.nome === medico)
          .map((data: any[]) => data.dia)),
      );
    }

    getHoras(dia:string, medico:string): Observable<any> {
      return this.http.get(
        env.baseApiURL + this.PATH_AGENDAS, this.httpUtil.headers(),
      ).pipe(
        map((response: any[]) => response.results
          .map((respo: any[]) => ({
            ...respo,
          }))
          .filter((resp: any[]) => resp.medico.nome === medico)
          .filter((data: any[]) => data.dia === dia)
          .map((horas: any[]) => horas.horarios)),
      );
    }

    getagenda_id(dia:string, medico:string) {
      return this.http.get(
        env.baseApiURL + this.PATH_AGENDAS, this.httpUtil.headers(),
      ).pipe(
        map((response: any[]) => response.results
          .filter((resp: any[]) => resp.medico.nome === medico)
          .filter((data: any[]) => data.dia === dia)
          .map((respo: number) => respo.id)),
      );
    }

    listarConsultas(): Observable<any> {
      return this.http.get(
        env.baseApiURL + this.PATH_CONSULTAS, this.httpUtil.headers(),
      ).pipe(
        map((response: any[]) => response),
      );
    }

    deletarConsultas(consultaId: string): Observable<any> {
      return this.http.delete(env.baseApiURL + this.PATH_CONSULTAS + consultaId,
        this.httpUtil.headers());
    }
}
