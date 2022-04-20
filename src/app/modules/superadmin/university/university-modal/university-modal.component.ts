import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: './university-modal.component.html',
  styleUrls: ['./university-modal.component.scss']
})
export class UniversityModalComponent implements OnInit {
  university = this._fb.group({
    name: this._fb.control('', [Validators.required]),
    city: this._fb.control('', [Validators.required]),
    degree: this._fb.control('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<UniversityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    if (this.data) {
      this.university.patchValue(this.data);
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (this.university.invalid) {
      return this._snackBar.open('Invalid data.');
    }

    this.dialogRef.close({
      success: true,
      data: this.university.getRawValue()
    })
  }
}
