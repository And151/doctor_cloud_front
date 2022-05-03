import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserRole, UserTypes} from "../../../../core/user/user.types";
import {DoctorService} from "../../../../service/doctor.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {


  constructor(
      private _doctorService: DoctorService,
      private _form: FormBuilder,
      private _snack: MatSnackBar,
      public dialogRef: MatDialogRef<AddDoctorComponent>,
  ) { }

  ngOnInit(): void {
  }

  create(e) {
    if(e) {
      this._doctorService.createDoctor(e).subscribe(data => {
        this._snack.open("successfully created", "", {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-bar']
        })
        this.dialogRef.close();
      });
    }
  }
}
