import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IHospital} from "../../../../models/hospitals.model";
import {MatListOption} from "@angular/material/list";
import {DoctorService} from "../../../../service/doctor.service";
import {ConfirmDialogComponent} from "../../../../shared/confirm-dialog/confirm-dialog.component";
import {AttachHospitalComponent} from "../attach-hospital/attach-hospital.component";
import {User} from "../../../../core/user/user.types";

@Component({
  selector: 'app-edit-doctor-hospitals',
  templateUrl: './edit-doctor-hospitals.component.html',
  styleUrls: ['./edit-doctor-hospitals.component.scss']
})
export class EditDoctorHospitalsComponent implements OnInit {

  hospitals: IHospital[]=[];

  constructor(
      private _form: FormBuilder,
      public dialogRef: MatDialogRef<EditDoctorHospitalsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: User,
      private _fb: FormBuilder,
      private _snackBar: MatSnackBar,
      private _doctorService: DoctorService,
      private _dialog: MatDialog
  ) {
    if (this.data) {
      this.hospitals = this.data.hospital;
    }
  }

  ngOnInit(): void {
  }

  removeHospitals(selected: MatListOption[]) {
    let hospitals = [];
    hospitals = selected.map(item => item.value)

    this._dialog.open(ConfirmDialogComponent, {
      maxWidth: '650px',
      width: '100%',
      data: {
        title: 'Attention!',
        content: 'Are you sure you want to remove the hospital from the doctor?',
        yesButton: 'Yes'
      }
    })
        .afterClosed()
        .subscribe(
            confirmed => {
              if (confirmed) {
                this.dialogRef.close({remove: hospitals});
              }
            }
        )
  }

  cancel() {
    this.dialogRef.close();
  }

  attachHospitals() {
    this._dialog.open(AttachHospitalComponent, {
      maxWidth: '650px',
      width: '100%',
      data: {
        attachedHospitals: this.hospitals.map(item => item.id)
      }
    }).afterClosed().subscribe(
        data => {
          this.dialogRef.close({attach: data});
        }
    )
  }
}
