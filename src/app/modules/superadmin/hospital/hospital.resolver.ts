import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {HospitalsService} from "../../../service/hospitals.service";
import {forkJoin} from "rxjs";


@Injectable({
    providedIn: "root"
})
export class HospitalResolver implements Resolve<any> {
    constructor(
        private _hospitalService: HospitalsService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
      return forkJoin([
          this._hospitalService.getHospitals()
      ]);
    }
}