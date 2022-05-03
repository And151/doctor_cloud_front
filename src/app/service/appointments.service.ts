import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private _http: HttpClient) { }

  proposeAppointment(data) {
    const url = Location.joinWithSlash(
        environment.origin || '', '/appointments'
    )
    return this._http.post(url, data);
  }
}
