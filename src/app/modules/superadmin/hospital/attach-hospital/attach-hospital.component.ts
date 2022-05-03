import {Component, Inject, OnInit} from '@angular/core';
import {HospitalsService} from "../../../../service/hospitals.service";
import {IHospital} from "../../../../models/hospitals.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-attach-hospital',
  templateUrl: './attach-hospital.component.html',
  styleUrls: ['./attach-hospital.component.scss']
})
export class AttachHospitalComponent implements OnInit {
  hospitals: IHospital[];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: { attachedHospitals: number[] },
      private _hospitalService: HospitalsService,
      public dialogRef: MatDialogRef<AttachHospitalComponent>,
  ) { }

  ngOnInit(): void {
    this._hospitalService.getHospitals(false).subscribe(data => {

      this.hospitals = data;
      this.hospitals = this.hospitals.filter(item => !this.data.attachedHospitals.includes(item.id));
    });
  }


  cancel() {
    this.dialogRef.close();
  }

  addHospitals(selected) {
    this.dialogRef.close(selected)
  }
}
