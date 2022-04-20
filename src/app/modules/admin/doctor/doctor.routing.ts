import {Routes} from "@angular/router";
import {DoctorComponent} from "./doctor.component";
import {DoctorResolver} from "./doctor.resolver";


export const DoctorRouting: Routes = [
    {
        path: "",
        pathMatch: 'full',
        resolve: {
            hospitalData: DoctorResolver
        },
        component: DoctorComponent,
    },
    {
        path: '**',
        redirectTo:  ""
    }
]