import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Observable} from "rxjs";
import {UserRole} from "../../../core/user/user.types";

@Component({
  selector: 'landing-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements AfterViewInit {
  isAuthenticated$: Observable<{ allowed: boolean; roleId?: UserRole }>;
  userRoles = UserRole;

  constructor(
    private _authService: AuthService
  ) {
    this.isAuthenticated$ = _authService.check();
  }

  ngAfterViewInit() {
  }
}
