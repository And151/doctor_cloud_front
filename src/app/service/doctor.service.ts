import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {IUser} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {IHospital} from "../models/hospitals.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctors$ = new BehaviorSubject<IUser[]>([]);
  constructor(
      private _http: HttpClient
  ) { }

  getDoctors() {
    const url = Location.joinWithSlash(
        environment.origin || '', '/user/doctors'
    )
    return this._http.get<IUser[]>(url).pipe(
        tap(item => this.doctors$.next(item))
    );
  }
}
