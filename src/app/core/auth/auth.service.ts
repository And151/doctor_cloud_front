import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import {IUserRoles, User, UserRole, UserTypes} from "../user/user.types";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private _roleId: IUserRoles;
    private _userType: UserTypes;


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

    /**
     * Getter for authenticated boolean
     */
    get isAuthenticated(): boolean {
        return this._authenticated;
    }

    /**
     * Getter for authenticated boolean
     */
    set isAuthenticated(data: boolean) {
        this._authenticated = data;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    get roleId(): IUserRoles {
        return this._roleId;
    }

    get userType(): UserTypes {
        return this._userType;
    }

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
                this._roleId = response.user.roleId;

                this._userType = response.user.type;

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
                of({
                    allowed: false
                })
            ),
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Set the role id
                this._roleId = response.user.roleId;

                this._userType = response.user.type;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of({
                    allowed: true,
                    roleId: this._roleId
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
    signUp(user: { first_name: string; last_name: string; email: string; password: string; phone: string }): Observable<any> {
        const url = Location.joinWithSlash(environment.origin, 'user/register');
        return this._httpClient.post(url, user);
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
            if (roles && roles.indexOf(this._roleId) === -1) {
                return of({
                    allowed: false,
                    roleId: this._roleId
                });
            }
            if (type && type !== this._userType) {
                return of({
                    allowed: false,
                    roleId: this._roleId
                });
            }
            return of({
                allowed: true,
                roleId: this._roleId
            });
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of({
                allowed: false,
                roleId: this._roleId
            });
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of({
                allowed: false,
                roleId: this._roleId
            });
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
