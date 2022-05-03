import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent implements OnInit {

  hospital = this._form.group({
    name: [""],
    address: [""],
    latitude: [null],
    longitude: [null],
    imageUrl: [""]
  })
  constructor(
      private _form: FormBuilder,
      public dialogRef: MatDialogRef<EditHospitalComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private _fb: FormBuilder,
      private _snackBar: MatSnackBar
  ) {
    if (this.data) {
      this.hospital.patchValue(this.data);
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (this.hospital.invalid) {
      return this._snackBar.open('Invalid data.');
    }

    this.dialogRef.close({
      success: true,
      data: this.hospital.getRawValue()
    })
  }
}
