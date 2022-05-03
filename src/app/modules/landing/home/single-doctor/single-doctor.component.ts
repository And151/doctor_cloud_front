import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../core/auth/auth.service";
import {User, UserTypes} from "../../../../core/user/user.types";
import {AppointmentsService} from "../../../../service/appointments.service";
import {UserService} from "../../../../core/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-doctor',
  templateUrl: './single-doctor.component.html',
  styleUrls: ['./single-doctor.component.scss']
})
export class SingleDoctorComponent {
  appointment: Date;
  private user: User;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: User,
      public dialogRef: MatDialogRef<SingleDoctorComponent>,
      private _authService: AuthService,
      private _userService: UserService,
      private _appointmentsService: AppointmentsService,
      private _bar: MatSnackBar,
      private _router: Router
  ) {
    this._userService.user$.subscribe(data => {
      this.user = data;

    })
  }

  proposeTime() {
    if(!this._authService.isAuthenticated) {
      this.dialogRef.close();
      this._router.navigateByUrl("sign-in");
      return;
    }

    if(this._authService.userType === UserTypes.USER) {
        this._appointmentsService.proposeAppointment({
          doctor: this.data.id,
          user: this._userService.user.id,
          date: this.appointment

        }).subscribe(res =>
            this._bar.open("Appointment request successfully sent", "", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['success-bar']
            })
        );
        this.dialogRef.close();
    }else if(this._authService.userType === UserTypes.DOCTOR) {
     this._bar.open("Sorry, you can't book an appointment", "", {
       duration: 3000,
       verticalPosition: 'top',
       panelClass: ['success-bar']
     })
    }
  }
}
