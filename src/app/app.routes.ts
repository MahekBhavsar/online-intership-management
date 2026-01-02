import { Routes } from '@angular/router';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { Dashboard } from './users/dashboard/dashboard';
import { ManagedPIntershiprogram } from './admin/managed-intership-program/managed-intership-program';
import { ManagedCourse } from './admin/managed-course/managed-course';
import { ManagedStaff } from './admin/managed-staff/managed-staff';
import { Registration } from './users/registration/registration';

export const routes: Routes = [
    {
        path: 'admin/dashboard',
        component: AdminDashboard
    },
    {
        path: 'user/dashboard',
        component: Dashboard
    },
    {
        path: 'admin/managed-intership',
        component: ManagedPIntershiprogram 
    },
    {
        path: 'admin/managed-course',
        component: ManagedCourse
    },
    {
        path: 'admin/managed-staff',
        component: ManagedStaff
    },
    {
        path: '',
        redirectTo: 'user/registration',
        pathMatch: "full"

    },
    {
        path:'users/registration',component:Registration
    }

];
