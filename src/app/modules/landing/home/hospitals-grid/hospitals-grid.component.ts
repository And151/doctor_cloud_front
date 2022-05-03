import {Component} from '@angular/core';
import {HospitalsService} from "../../../../service/hospitals.service";
import {IHospital} from "../../../../models/hospitals.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hospitals-grid',
  templateUrl: './hospitals-grid.component.html',
  styleUrls: ['./hospitals-grid.component.scss']
})
export class HospitalsGridComponent {
  hospitals: IHospital[];

  constructor(
    private _hospitalService: HospitalsService,
    private _router: Router
  ) {
    this.hospitals = this._hospitalService.hospitals$.value;
  }

  navigateToDoctors(id: number) {
    this._router.navigateByUrl('/all-doctors?hospitalId=' + id);
  }
}
