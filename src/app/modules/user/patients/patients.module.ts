import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PatientsComponent } from './patients/patients.component';


const PatientsRoutes: Routes = [
  {
    path: "",
    component: PatientsComponent
  }
]


@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild(PatientsRoutes)
  ]
})
export class PatientsModule { }
