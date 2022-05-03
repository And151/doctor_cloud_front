import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {IAppointment} from "../models/appointment.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  proposeAppointment(data) {
    const url = Location.joinWithSlash(
      environment.origin || '', 'appointments'
    );
    return this._httpClient.post(url, data);
  }

  getDoctorAppointments() {
    const url = Location.joinWithSlash(
      environment.origin || '', 'appointments/doctor'
    );
    return this._httpClient.get<IAppointment[]>(url);
  }

  get() {
    const url = Location.joinWithSlash(
      environment.origin || '', 'appointments'
    );
    return this._httpClient.get<IAppointment[]>(url);
  }

  approve(id: number) {
    const url = Location.joinWithSlash(
      environment.origin || '', 'appointments/' + id
    );
    return this._httpClient.patch<IAppointment[]>(url, {is_approved: true});
  }
}
