import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth-guard.service';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';
import {UserRole, UserTypes} from "./core/user/user.types";
import {HomeDataResolver} from "./HomeDataResolver";

export const appRoutes: Route[] = [

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    resolve: {
      initialData: HomeDataResolver
    },
    children: [
      {path: '', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
    ]
  },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
      }
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER]
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
      },
      {
        path: 'unlock-session',
        loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
      }
    ]
  },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
        roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER],
        type: UserTypes.DOCTOR
    },
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {path: 'doctors', loadChildren: () => import('app/modules/admin/doctor/doctor.module').then(m => m.DoctorModule)},
      {path: 'appointments', loadChildren: () => import('app/modules/user/appointments/appointments.module').then(m => m.AppointmentsModule)},
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      roles: [UserRole.SUPER_ADMIN],
      type: UserTypes.DOCTOR
    },
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'hospitals',
        loadChildren: () => import('app/modules/superadmin/hospital/hospital.module').then(m => m.HospitalModule)
      },
      {
        path: 'university',
        loadChildren: () => import('app/modules/superadmin/university/university.module').then(m => m.UniversityModule)
      },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
      type: UserTypes.DOCTOR
    },
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'overview',
        loadChildren: () => import('app/modules/user/overview/overview.module').then(m => m.OverviewModule)
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];
