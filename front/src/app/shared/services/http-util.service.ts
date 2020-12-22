/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor() { }

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (localStorage.token) {
      httpHeaders = httpHeaders.set(
        'Authorization', `JWT ${localStorage.token}`,
      );
    }
    return { headers: httpHeaders };
  }

  obterNomeUsuario() {
    if (!localStorage.token) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.name : '';
  }

  obterDadosUsuario() {
    if (!localStorage.token) {
      return '';
    }
    return JSON.parse(atob(localStorage.token.split('.')[1]));
  }
}
