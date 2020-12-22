/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// eslint-disable-next-line import/extensions
import { environment as env } from '../../../environments/environment';
import { Login } from '../login/login.model';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private readonly PATH: string = 'auth/login/';

  constructor(private http: HttpClient) { }

  logar(login:Login): Observable<any> {
    return this.http.post(env.baseURL + this.PATH, login);
  }
}
