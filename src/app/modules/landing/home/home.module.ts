import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from 'app/shared/shared.module';
import {LandingHomeComponent} from 'app/modules/landing/home/home.component';
import {landingHomeRoutes} from 'app/modules/landing/home/home.routing';
import {HospitalsGridComponent} from "./hospitals-grid/hospitals-grid.component";
import { DoctorsGridComponent } from './doctors-grid/doctors-grid.component';
import { SingleDoctorComponent } from './single-doctor/single-doctor.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    LandingHomeComponent,
    HospitalsGridComponent,
    DoctorsGridComponent,
    SingleDoctorComponent
  ],
  imports: [
    RouterModule.forChild(landingHomeRoutes),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDividerModule
  ]
})
export class LandingHomeModule {
}
