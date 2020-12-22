import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private readonly PATH: string = 'account/logout/';

  constructor(private http: HttpClient) { }

  logout() {
    if (localStorage.token) {
      localStorage.removeItem('token');
      // return this.http.get(env.baseApiURL + this.PATH);
    }
  }
}
