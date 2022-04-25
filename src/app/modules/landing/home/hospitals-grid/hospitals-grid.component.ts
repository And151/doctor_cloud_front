import {Component, OnInit} from '@angular/core';
import {HospitalsService} from "../../../../service/hospitals.service";
import {IHospital} from "../../../../models/hospitals.model";

@Component({
  selector: 'app-hospitals-grid',
  templateUrl: './hospitals-grid.component.html',
  styleUrls: ['./hospitals-grid.component.scss']
})
export class HospitalsGridComponent implements OnInit {
  hospitals: IHospital[];

  constructor(
    private _hospitalService: HospitalsService
  ) {
    this.hospitals = this._hospitalService.hospitals$.value;
  }

  ngOnInit(): void {
  }

}
