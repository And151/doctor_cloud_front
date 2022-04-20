import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {IUser} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
      private _http: HttpClient
  ) { }

  getDoctors() {
    const url = Location.joinWithSlash(
        environment.origin || '', '/user/doctors'
    )
    return this._http.get<IUser[]>(url);

  }


}
