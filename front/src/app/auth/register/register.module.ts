import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegisterExportComponent } from './components/register-export.component';
import { RegisterComponent } from './components/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterService } from './register.service';

@NgModule({
  declarations: [
    RegisterExportComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,

  ],
  providers: [
    RegisterService,
  ],
})
export class RegisterModule { }
