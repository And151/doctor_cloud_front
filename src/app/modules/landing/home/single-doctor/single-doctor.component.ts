import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IUser} from "../../../../models/user.model";
import {AuthService} from "../../../../core/auth/auth.service";
import {User, UserTypes} from "../../../../core/user/user.types";
import {AppointmentsService} from "../../../../service/appointments.service";
import {UserService} from "../../../../core/user/user.service";

@Component({
  selector: 'app-single-doctor',
  templateUrl: './single-doctor.component.html',
  styleUrls: ['./single-doctor.component.scss']
})
export class SingleDoctorComponent implements OnInit {
  appointment: any;
  private user: User;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IUser,
      private _authService: AuthService,
      private _userService: UserService,
      private _appointmentsService: AppointmentsService
  ) {
    this._userService.user$.subscribe(data => {
      this.user = data;
    })
  }

  ngOnInit(): void {
    console.log(this.appointment)
    console.log(this._userService.user)
  }

  proposeTime() {
    if(this._authService.isAuthenticated && this._authService.userType === UserTypes.USER) {
        this._appointmentsService.proposeAppointment({
          doctor: this.data.id,
        /*  user: this._userService.get().subscribe(re)*/
        })
    }
  }
}
