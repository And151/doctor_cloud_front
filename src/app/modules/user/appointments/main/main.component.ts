import {Component, OnInit} from '@angular/core';
import {AppointmentsService} from "../../../../service/appointments.service";
import {FuseSplashScreenService} from "../../../../../@fuse/services/splash-screen";
import {MatTableDataSource} from "@angular/material/table";
import {IAppointment} from "../../../../models/appointment.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  dataSource: MatTableDataSource<IAppointment>;
  displayedColumns = ['id', 'date', 'user', 'is_approved', 'actions'];

  constructor(
    private _appointmentService: AppointmentsService,
    private _splashScreen: FuseSplashScreenService,
    private _snackBar: MatSnackBar
  ) {
    this._splashScreen.show();
    this._appointmentService.getDoctorAppointments()
      .subscribe(appointments => {
        this._splashScreen.hide();
        this.dataSource = new MatTableDataSource<IAppointment>(appointments);
      });
  }

  ngOnInit(): void {
  }

  approve(id: number) {
    this._appointmentService.approve(id).subscribe(
      _ => {
        this._snackBar.open('Appointment approved', 'ok', {duration: 3000});
        this.dataSource.data.find(item => item.id === id).is_approved = true;
      },
      _ => {
        this._snackBar.open('Something went wrong', 'ok', {duration: 3000});
      }
    )
  }
}
