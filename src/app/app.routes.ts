import { Routes } from '@angular/router';
<<<<<<< HEAD
import { Dashboard } from './users/dashboard/dashboard';
import { Navbar } from './users/navbar/navbar';
import { Footer } from './users/footer/footer';
import { Header } from './users/header/header';

export const routes: Routes = [
    {path: "dashboard", component: Dashboard},
    {path: "navbar" , component: Navbar},
    {path: "header", component: Header},
    {path: "footer", component : Footer},
    {path: "" , redirectTo : "dashboard" , pathMatch : "full"}
=======
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { Dashboard } from './users/dashboard/dashboard';
import { ManagedPIntershiprogram } from './admin/managed-intership-program/managed-intership-program';
import { ManagedCourse } from './admin/managed-course/managed-course';
import { ManagedStaff } from './admin/managed-staff/managed-staff';

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
        redirectTo: 'user/dashboard',
        pathMatch: "full"

    }

>>>>>>> 2343fa5dc20d34d24213ff53aaf0059ff29737c4
];
