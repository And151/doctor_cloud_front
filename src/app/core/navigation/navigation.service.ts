import {Injectable} from '@angular/core';
import {Navigation} from 'app/core/navigation/navigation.types';
import {UserRole, UserTypes} from "../user/user.types";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: Navigation = {
        default: [
            {
                roleId: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
                icon: "heroicons_outline:view-grid",
                id: "overview",
                link: "/overview",
                title: "Overview",
                type: "basic",
            },
            {
                roleId: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
                icon: "heroicons_outline:user-group",
                id: "doctors",
                link: "/doctors",
                title: "Doctors",
                type: "basic",
            },
            {
                roleId: [UserRole.USER],
                icon: "heroicons_outline:calendar",
                id: "appointments",
                link: "/appointments",
                title: "Appointments",
                type: "basic",
            },
            {
                roleId: [UserRole.SUPER_ADMIN],
                icon: "heroicons_outline:home",
                id: "hospitals",
                link: "/hospitals",
                title: "Hospitals",
                type: "basic",
            },
            {
                roleId: [UserRole.SUPER_ADMIN],
                icon: "heroicons_outline:academic-cap",
                id: "university",
                link: "/university",
                title: "University",
                type: "basic",
            }
        ]
    }

    /**
     * Constructor
     */
    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation(): Navigation {
        return this._navigation;
    }

    getNavigation(userType?: UserTypes, roleId?: UserRole): Navigation {
        const roleIdCheck = (arr?: UserRole[]) => {
            if (!roleId || !arr) return true;
            if (arr) return arr.indexOf(roleId) !== -1;
        }
        const typeCheck = (type?: UserTypes) => {
            if (!userType || !type) return true;
            if (type) return type === userType;
        }
        return {default: this._navigation.default.filter(item => roleIdCheck(item.roleId) && typeCheck(item.userType))};
    }
}
