import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class Guard implements CanActivate {
  constructor(
        private router: Router,
  ) { }

  canActivate(): boolean {
    if (localStorage.token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
