import {Route} from '@angular/router';
import {LandingHomeComponent} from 'app/modules/landing/home/home.component';
import {HospitalsGridComponent} from "./hospitals-grid/hospitals-grid.component";
import {HospitalResolver} from "../../superadmin/hospital/hospital.resolver";

export const landingHomeRoutes: Route[] = [
  {
    path: '',
    component: LandingHomeComponent,
    children: [
      {
        path: 'hospital',
        resolve: {
          resolved: HospitalResolver
        },
        component: HospitalsGridComponent
      }
    ]
  }
];
