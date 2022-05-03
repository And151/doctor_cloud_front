import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {MessagesService} from "./layout/common/messages/messages.service";
import {NavigationService} from "./core/navigation/navigation.service";
import {NotificationsService} from "./layout/common/notifications/notifications.service";
import {QuickChatService} from "./layout/common/quick-chat/quick-chat.service";
import {ShortcutsService} from "./layout/common/shortcuts/shortcuts.service";
import {UserService} from "./core/user/user.service";
import {Observable, of} from "rxjs";
import {User} from "./core/user/user.types";
import {catchError, tap} from "rxjs/operators";
import {FuseSplashScreenService} from "../@fuse/services/splash-screen";
import {AuthService} from "./core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class HomeDataResolver implements Resolve<User>
{
    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        private _splashService: FuseSplashScreenService,
        private _authService: AuthService

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        this._splashService.show();
        if(this._authService.accessToken) {
            return this._authService.signInUsingToken().pipe(
                tap(_ => {
                    this._splashService.hide()
                }),
                catchError(_ => {
                    this._splashService.hide();
                    return of(null);
                })
            );
        }

    }
}