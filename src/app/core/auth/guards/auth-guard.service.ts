import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from 'app/core/auth/auth.service';
import {switchMap, tap} from 'rxjs/operators';
import {IUserRoles, UserRole, UserTypes} from "../../user/user.types";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, route.data.roles, route.data.type).pipe(
            tap(item => console.log(item))
        );
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, childRoute.parent.data.roles, childRoute.parent.data.type);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        return this._check('/', route.data.roles, route.data.type);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     * Check the authenticated status
     *
     * @param redirectURL
     * @param roles
     * @param type
     * @private
     */
    private _check(redirectURL: string, roles?: IUserRoles[], type?: UserTypes): Observable<boolean>
    {
        // Check the authentication status
        return this._authService.check(roles, type)
                   .pipe(
                       switchMap((data) => {
                           // If the user is not authenticated...
                           if ( !data.allowed )
                           {
                               if (!data.roleId) {
                                   // Redirect to the sign-in page
                                   this._router.navigate(['sign-in'], {queryParams: {redirectURL}});
                               } else if (data.roleId === UserRole.ADMIN) {
                                   // Redirect to the sign-in page
                                   this._router.navigate(['home'], {queryParams: {redirectURL}});
                               }

                               // Prevent the access
                               return of(false);
                           }

                           // Allow the access
                           return of(true);
                       })
                   );
    }
}
