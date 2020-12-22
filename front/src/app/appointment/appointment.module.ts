import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpUtilService, Guard } from '../shared';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentService } from './appointment.service';
import { AppointmentComponent } from './components/appointment.component';
import { ListingComponent } from './components/listing/listing.component';
import { SchedulingComponent } from './components/scheduling/scheduling.component';

@NgModule({
  declarations: [
    ListingComponent,
    SchedulingComponent,
    AppointmentComponent,

  ],

  imports: [
    CommonModule,
    AppointmentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    HttpUtilService,
    AppointmentService,
    Guard,
  ],
})
export class AppointmentModule { }
