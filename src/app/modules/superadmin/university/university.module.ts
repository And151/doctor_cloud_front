import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UniversityComponent} from './university/university.component';
import {RouterModule} from "@angular/router";
import {UniversityRouting} from "./university.routing";
import {UniversityService} from "../../../service/university.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UniversityResolver} from "./university.resolver";
import { UniversityModalComponent } from './university-modal/university-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    UniversityComponent,
    UniversityModalComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(UniversityRouting),
        MatFormFieldModule,
        FormsModule,
        SharedModule,
        MatDividerModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
  providers: [
    UniversityService,
    UniversityResolver
  ]
})
export class UniversityModule {
}
