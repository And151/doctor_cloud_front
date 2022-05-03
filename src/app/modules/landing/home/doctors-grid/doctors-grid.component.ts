import {Component} from '@angular/core';
import {DoctorService} from "../../../../service/doctor.service";
import {MatDialog} from "@angular/material/dialog";
import {SingleDoctorComponent} from "../single-doctor/single-doctor.component";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../core/user/user.types";
import {FuseSplashScreenService} from "../../../../../@fuse/services/splash-screen";

@Component({
  selector: 'app-doctors-grid',
  templateUrl: './doctors-grid.component.html',
  styleUrls: ['./doctors-grid.component.scss']
})
export class DoctorsGridComponent {
  doctors: User[];
  hospitalId: number | undefined;

  constructor(
    private _doctorService: DoctorService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _splashService: FuseSplashScreenService
  ) {
    this.doctors = this._doctorService.doctors$.value;
    this._doctorService.doctors$.subscribe(
      data => {
        this.doctors = data;
      }
    );
    this.hospitalId = +this._activatedRouter.snapshot.queryParams["hospitalId"];
  }

  seeDoctorInfo(doctor: User) {
    this._dialog.open(SingleDoctorComponent, {
      maxWidth: '650px',
      width: '100%',
      data: doctor
    })
  }

  reset() {
    this._splashService.show();
    this._doctorService.getDoctors().subscribe(
      _ => {
        this.hospitalId = undefined;
        this._splashService.hide();
      },
      _ => {
        this.hospitalId = undefined;
        this._splashService.hide();
      }
    );
  }
}
