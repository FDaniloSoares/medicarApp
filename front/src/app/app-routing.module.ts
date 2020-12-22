import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'cadastro',
    loadChildren: () => import('./auth/register/register.module')
      .then((mod) => mod.RegisterModule),
  },
  {
    path: 'consultas',
    loadChildren: () => import('./appointment/appointment.module')
      .then((mod) => mod.AppointmentModule),
  },
  // { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
