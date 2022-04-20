import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {forkJoin} from "rxjs";
import {UniversityService} from "../../../service/university.service";


@Injectable({
  providedIn: "root"
})
export class UniversityResolver implements Resolve<any> {

  constructor(
    private _universityService: UniversityService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return forkJoin([
      this._universityService.getAll()
    ]);
  }
}
