import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginExportComponent } from './components/login-export.componet';
import { LoginComponent } from './components/login.component';

export const LoginRoutes: Routes = [{
  path: 'login',
  component: LoginExportComponent,
  children: [{ path: '', component: LoginComponent }],
}];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],
  exports: [RouterModule],
})

export class LoginRoutingModule {
}
