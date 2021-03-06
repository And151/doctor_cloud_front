import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {User, UserRole, UserTypes} from "../../../core/user/user.types";
import {UserService} from "../../../core/user/user.service";

@Component({
  selector: 'landing-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements AfterViewInit {
  isAuthenticated = false;
  userRoles = UserRole;
  userTypes = UserTypes;
  user: User;

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.isAuthenticated = _authService.isAuthenticated;
    this.user = _userService.user;
  }

  ngAfterViewInit() {
  }
}
