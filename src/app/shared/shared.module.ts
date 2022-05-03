import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { PanelComponent } from './panel/panel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SearchBoxComponent,
        PanelComponent
    ],
    declarations: [
      SearchBoxComponent,
      ConfirmDialogComponent,
      PanelComponent
    ]
})
export class SharedModule
{
}
