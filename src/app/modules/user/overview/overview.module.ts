import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OverviewComponent} from './overview/overview.component';
import {FuseCardModule} from "../../../../@fuse/components/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";


const overviewRouting: Routes = [
    {
        path: '',
        component: OverviewComponent
    }
]

@NgModule({
    declarations: [
        OverviewComponent
    ],
    imports: [
        CommonModule,
        FuseCardModule,
        MatIconModule,
        MatButtonModule,
        RouterModule.forChild(overviewRouting),
        SharedModule,
        MatTableModule
    ]
})
export class OverviewModule {
}
