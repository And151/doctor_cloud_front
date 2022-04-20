import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HospitalsService} from "../../../../service/hospitals.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {

  constructor(
      private hospitalService: HospitalsService,
      private _form: FormBuilder,
      private _snack: MatSnackBar,
      public dialogRef: MatDialogRef<AddHospitalComponent>,
  ) { }

  newHospital = this._form.group({
    name: [""],
    address: [""],
    latitude: [null],
    longitude: [null]
  })

  ngOnInit(): void {
  }

  create() {
    if(this.newHospital.valid) {
      this.hospitalService.createHospital(this.newHospital.getRawValue())
          .subscribe(res => {
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
