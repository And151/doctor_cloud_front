import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {IHospital, INewHospital} from "../models/hospitals.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {
  hospitals$ = new BehaviorSubject<IHospital[]>([]);

  constructor(
    private http: HttpClient
  ) {
  }

  getHospitals(resolver = false): Observable<IHospital[]> {
    if (resolver && this.hospitals$.value?.length) {
      return of(this.hospitals$.value);
    }
    const url = Location.joinWithSlash(
      environment.origin || '', '/hospital'
    )
    return this.http.get<IHospital[]>(url).pipe(
      tap(item => this.hospitals$.next(item))
    );
  }

  getHospitalById(id: number) {
    const url = Location.joinWithSlash(
      environment.origin || '', `/hospital/${id}`
    )
    return this.http.get<IHospital>(url);
  }

  createHospital(body: INewHospital) {
    const url = Location.joinWithSlash(
      environment.origin || '', `/hospital/`
    )
    return this.http.post(url, body);
  }

  editHospital(id: number, data) {
    const url = Location.joinWithSlash(
        environment.origin || '', `/hospital/${id}`
    )
    return this.http.patch(url, data);
  }

  deleteHospital(id:number) {
    const url = Location.joinWithSlash(
        environment.origin || '', `/hospital/${id}`
    )
    return this.http.delete(url);
  }

  attachHospital(doctor, hospital) {
    const url = Location.joinWithSlash(
        environment.origin || '', `/hospital-doctors`
    )
    const data = {
      hospitalId: hospital,
      userId: doctor
    }
    return this.http.post(url,data);

  }
}
