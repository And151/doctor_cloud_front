import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DoctorComponent} from './doctor.component';
import {RouterModule} from "@angular/router";
import {DoctorRouting} from "./doctor.routing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { DoctorTemplateComponent } from './doctor-template/doctor-template.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";


@NgModule({
    declarations: [
        DoctorComponent,
        AddDoctorComponent,
        DoctorTemplateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DoctorRouting),
        MatFormFieldModule,
        FormsModule,
        SharedModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        },
    ],
})
export class DoctorModule {
}
