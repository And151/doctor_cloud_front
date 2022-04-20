import {Routes} from "@angular/router";
import {UniversityResolver} from "./university.resolver";
import {UniversityComponent} from "./university/university.component";

export const UniversityRouting: Routes = [
  {
    path: "",
    pathMatch: 'full',
    resolve: {
      hospitalData: UniversityResolver
    },
    component: UniversityComponent,
  },
  {
    path: '**',
    redirectTo:  ""
  }
]
