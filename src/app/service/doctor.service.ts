import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../core/user/user.types";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctors$ = new BehaviorSubject<User[]>([]);
  constructor(
      private _http: HttpClient
  ) { }

  getDoctors() {
    const url = Location.joinWithSlash(
        environment.origin || '', '/user/doctors'
    )
    return this._http.get<User[]>(url).pipe(
        tap(item => this.doctors$.next(item))
    );
  }

  createDoctor(data) {
    const url = Location.joinWithSlash(
        environment.origin || '', '/user'
    )
    return this._http.post(url, data);
  }

  deleteDoctor(id: number) {
    const url = Location.joinWithSlash(
        environment.origin || '', `/user/${id}`
    )

    return this._http.delete(url);
  }

  removeDoctorFromHospitals(id, data: number[]) {
    const url = Location.joinWithSlash(
        environment.origin || '', `/hospital-doctors/${id}`
    )
    const req = {"hospitalIds": data};
    return this._http.delete(url, {body : req} );
  }
}
