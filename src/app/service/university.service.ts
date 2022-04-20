import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {IUniversity} from "../models/university.model";

@Injectable()
export class UniversityService {
  university$ = new BehaviorSubject<IUniversity[]>([]);

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  create() {

  }

  getAll() {
    const url = Location.joinWithSlash(
      environment.origin || '', 'university'
    )

    return this._httpClient.get<IUniversity[]>(url).pipe(
      tap(data => {
        this.university$.next(data);
      })
    )
  }

  getById() {

  }

  update() {

  }

  delete() {

  }

}
