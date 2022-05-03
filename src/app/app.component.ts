import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {FuseSplashScreenService} from "../@fuse/services/splash-screen";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(router: Router,   private _splashScreenService: FuseSplashScreenService)
    {
        router.events.forEach((event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this._splashScreenService.show();
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this._splashScreenService.hide();
                    break;
                }
                default: {
                    break;
                }
            }
        })
    }


}
