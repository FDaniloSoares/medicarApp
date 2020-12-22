import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from '../../../environments/environment';
import { Register } from './register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly PATH: string = 'account/create/'

  constructor(private http: HttpClient) { }

  cadastrar(register:Register): Observable<any> {
    return this.http.post(env.baseApiURL + this.PATH, register);
  }
}
