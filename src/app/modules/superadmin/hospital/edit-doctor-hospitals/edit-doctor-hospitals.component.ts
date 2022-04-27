import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IHospital} from "../../../../models/hospitals.model";
import {IUser} from "../../../../models/user.model";
import {MatListOption} from "@angular/material/list";
import {DoctorService} from "../../../../service/doctor.service";

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
      @Inject(MAT_DIALOG_DATA) public data: IUser,
      private _fb: FormBuilder,
      private _snackBar: MatSnackBar,
      private _doctorService: DoctorService,
  ) {
    if (this.data) {
      this.hospitals = this.data.hospital;
    }
  }

  ngOnInit(): void {
  }

  removeHospitals(selected: MatListOption[]) {
    let hospitals = [];
   selected.map(item => hospitals.push(item.value))
    console.log(hospitals)
  }
}
