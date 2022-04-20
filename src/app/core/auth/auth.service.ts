import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import {IUserRoles, User, UserRole, UserTypes} from "../user/user.types";

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private roleId: IUserRoles;
    private userType: UserTypes;


    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        const url = Location.joinWithSlash(environment.origin || '', 'auth/login');

        return this._httpClient.post(url, credentials).pipe(
            switchMap((response: { accessToken: string; user: User }) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Set the role id
                this.roleId = response.user.roleId;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        const url = Location.joinWithSlash(environment.origin || '', 'auth/refresh-access-token');
        // Renew token
        return this._httpClient.post(url, {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Set the role id
                this.roleId = response.user.roleId;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of({
                    allowed: true
                });
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(roles?: IUserRoles[], type?: UserTypes): Observable<{ allowed: boolean; roleId?: UserRole }> {
        // Check if the user is logged in and is admin
        if (this._authenticated) {
            if (roles && roles.indexOf(this.roleId) === -1) {
                return of({
                    allowed: false,
                    roleId: this.roleId
                });
            }
            if (type && type !== this.userType) {
                return of({
                    allowed: false,
                    roleId: this.roleId
                });
            }
            return of({
                allowed: true
            });
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of({
                allowed: false
            });
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of({
                allowed: false
            });
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
