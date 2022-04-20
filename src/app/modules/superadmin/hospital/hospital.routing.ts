import {Routes} from "@angular/router";
import {HospitalComponent} from "./hospital/hospital.component";
import {HospitalResolver} from "./hospital.resolver";

export const HospitalRouting: Routes = [
    {
        path: "",
        pathMatch: 'full',
        resolve: {
            hospitalData: HospitalResolver
        },
        component: HospitalComponent,
    },
    {
        path: '**',
        redirectTo:  ""
    }
]