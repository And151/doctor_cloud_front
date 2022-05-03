import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../../../../core/user/user.service";
import {of} from "rxjs";
import {DoctorService} from "../../../../service/doctor.service";

@Injectable({
    providedIn: 'root'
})
export class DoctorsResolver implements Resolve<any> {

    constructor(
        private _doctorService: DoctorService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const hospitalId = route.queryParams["hospitalId"];
        if (hospitalId) {
            return this._doctorService.getHospitalDoctors(hospitalId);
        } else {
            return this._doctorService.getDoctors();
        }
    }

}
