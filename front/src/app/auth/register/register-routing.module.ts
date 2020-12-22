import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterExportComponent } from './components/register-export.component';
import { RegisterComponent } from './components/register.component';

export const RegisterRoutes: Routes = [
  {
    path: '',
    component: RegisterExportComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(RegisterRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RegisterRoutingModule {}
