import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {FuseSplashScreenService} from "../../../@fuse/services/splash-screen";

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _splashService: FuseSplashScreenService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user() {
        return this._user.value;
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        const url = Location.joinWithSlash(environment.origin || '', 'user/current');
        return this._httpClient.get<User>(url).pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

   /* resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        this._splashService.show();
        let temp = localStorage.getItem("accessToken");
        if(temp) {
            return this.get().pipe(
                tap(_ => this._splashService.hide()),
                catchError(_ => {
                    this._splashService.hide()
                    return of(null);
                })
            );
        }

    }*/
}
