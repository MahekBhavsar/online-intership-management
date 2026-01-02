import { Routes } from '@angular/router';
import { Login } from './admin/login/login';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { Dashboard } from './users/dashboard/dashboard';


export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'admin-dashboard', component: AdminDashboard },
    { path: 'dashboard', component: Dashboard }
];
