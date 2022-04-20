import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './hospital/hospital.component';
import {RouterModule} from "@angular/router";
import {HospitalRouting} from "./hospital.routing";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    HospitalComponent,
    AddHospitalComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(HospitalRouting),
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatDividerModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        MatSnackBarModule
    ]
})
export class HospitalModule { }
