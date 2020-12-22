import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { Guard } from '../shared/services/guard.services';
import { AppointmentComponent } from './components/appointment.component';
import { ListingComponent } from './components/listing/listing.component';
import { SchedulingComponent } from './components/scheduling/scheduling.component';

export const AppointmentRoutes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    // canActivate: [Guard],
    children: [
      {
        path: '',
        component: ListingComponent,
      },
      {
        path: 'agendamento',
        component: SchedulingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(AppointmentRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppointmentRoutingModule {}
