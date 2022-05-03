import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../../../../service/doctor.service";
import {MatDialog} from "@angular/material/dialog";
import {SingleDoctorComponent} from "../single-doctor/single-doctor.component";
import {Router} from "@angular/router";
import {User} from "../../../../core/user/user.types";

@Component({
  selector: 'app-doctors-grid',
  templateUrl: './doctors-grid.component.html',
  styleUrls: ['./doctors-grid.component.scss']
})
export class DoctorsGridComponent implements OnInit {
  doctors: User[];

  constructor(
      private _doctorService: DoctorService,
      private _dialog: MatDialog,
      private _router: Router
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

  seeDoctorInfo(doctor: User) {
    this._dialog.open(SingleDoctorComponent, {
      maxWidth: '650px',
      width: '100%',
      data: doctor
    })
  }
}
