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


@NgModule({
    declarations: [
        DoctorComponent
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
        MatInputModule
    ]
})
export class DoctorModule {
}
