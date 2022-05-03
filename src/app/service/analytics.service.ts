import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {Istats} from "../models/analytics.model";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private _http: HttpClient) { }

  getStats() {
    const url = Location.joinWithSlash(
        environment.origin || '', '/analytics/stats'
    )
    return this._http.get<Istats>(url);
  }
}
