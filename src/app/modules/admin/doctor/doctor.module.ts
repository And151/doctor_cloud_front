import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import {RouterModule} from "@angular/router";
import {DoctorRouting} from "./doctor.routing";



@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild(DoctorRouting)
  ]
})
export class DoctorModule { }
