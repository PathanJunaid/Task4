import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LeaveApplicationComponent } from './features/leave/leave-application/leave-application.component';
import { LeaveRequestsComponent } from './features/leave/leave-requests/leave-requests.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component'; // Add this
import { loggedInGuard } from './core/auth/loggedInGuard';
import { SignupComponent } from './features/auth/signup/signup.component';
import { AnalyticsComponent } from './features/admin/analytics/analytics.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
    { path: 'register', component: SignupComponent, canActivate: [authGuard] },
    { path: 'leave-application', component: LeaveApplicationComponent, canActivate: [authGuard] },
    { path: 'leave-requests', component: LeaveRequestsComponent, canActivate: [authGuard] },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard],
        data: { role: 'admin' }
    },
    { path: '**', redirectTo: '/leave-requests' }
];