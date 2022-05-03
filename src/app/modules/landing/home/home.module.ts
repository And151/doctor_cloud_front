import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from 'app/shared/shared.module';
import {LandingHomeComponent} from 'app/modules/landing/home/home.component';
import {landingHomeRoutes} from 'app/modules/landing/home/home.routing';
import {HospitalsGridComponent} from "./hospitals-grid/hospitals-grid.component";
import { DoctorsGridComponent } from './doctors-grid/doctors-grid.component';

@NgModule({
  declarations: [
    LandingHomeComponent,
    HospitalsGridComponent,
    DoctorsGridComponent
  ],
  imports: [
    RouterModule.forChild(landingHomeRoutes),
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class LandingHomeModule {
}
