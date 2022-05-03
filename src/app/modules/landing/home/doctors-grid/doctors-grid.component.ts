import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../../../../service/doctor.service";
import {IUser} from "../../../../models/user.model";

@Component({
  selector: 'app-doctors-grid',
  templateUrl: './doctors-grid.component.html',
  styleUrls: ['./doctors-grid.component.scss']
})
export class DoctorsGridComponent implements OnInit {
  doctors: IUser[];

  constructor(
      private _doctorService: DoctorService
  ) {
    this.doctors = this._doctorService.doctors$.value;
    this._doctorService.doctors$.subscribe(
        data => {
          this.doctors = data;
        }
    )
  }

  ngOnInit(): void {
  }

}
