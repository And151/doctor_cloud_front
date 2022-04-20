import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {HospitalsService} from "../../../service/hospitals.service";
import {forkJoin} from "rxjs";
import {DoctorService} from "../../../service/doctor.service";


@Injectable({
    providedIn: "root"
})
export class DoctorResolver implements Resolve<any> {
    constructor(
        private _doctorService: DoctorService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return forkJoin([
            this._doctorService.getDoctors()
        ]);
    }
}