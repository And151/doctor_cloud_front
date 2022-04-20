import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {ICUUniversityDto, IUniversity} from "../models/university.model";

@Injectable()
export class UniversityService {
  university$ = new BehaviorSubject<IUniversity[]>([]);

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  create(universityDto: ICUUniversityDto) {
    const url = Location.joinWithSlash(
      environment.origin || '', 'university'
    );

    return this._httpClient.post<IUniversity>(url, universityDto).pipe(
      tap(data => {
        const universities = this.university$.value;
        universities.push(data);
        this.university$.next(universities);
      })
    );
  }

  getAll() {
    const url = Location.joinWithSlash(
      environment.origin || '', 'university'
    );

    return this._httpClient.get<IUniversity[]>(url).pipe(
      tap(data => {
        this.university$.next(data);
      })
    )
  }

  getById(id: number) {
    const url = Location.joinWithSlash(
      environment.origin || '', 'university/' + id
    );

    return this._httpClient.get(url);
  }

  update(id: number, universityDto: ICUUniversityDto) {
    const url = Location.joinWithSlash(
      environment.origin || '', 'university/' + id
    );

    return this._httpClient.patch(url, universityDto).pipe(
      tap(_ => {
        this.getAll().subscribe();
      })
    );
  }

  delete(id: number) {
    const url = Location.joinWithSlash(
      environment.origin || '', 'university/' + id
    );

    return this._httpClient.delete(url).pipe(
      tap(_ => {
        const universities = this.university$.value.filter(item => item.id !== id);
        this.university$.next(universities);
      })
    );
  }

}
