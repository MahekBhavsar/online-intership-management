import { Routes } from '@angular/router';
import { Dashboard } from './users/dashboard/dashboard';
import { Navbar } from './users/navbar/navbar';
import { Footer } from './users/footer/footer';
import { Header } from './users/header/header';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManagedPIntershiprogram } from './admin/managed-intership-program/managed-intership-program';
import { ManagedCourse } from './admin/managed-course/managed-course';
import { ManagedStaff } from './admin/managed-staff/managed-staff';
import { Login } from './users/login/login';
import { AdminLogin } from './admin/Adminlogin/admin-login';
import { Registration } from './users/registration/registration';

export const routes: Routes = [
    { path: "dashboard", component: Dashboard },
    { path: "navbar", component: Navbar },
    { path: "header", component: Header },
    { path: "footer", component: Footer },
    {
        path: 'admin/dashboard',
        component: AdminDashboard
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
        path:'users/registration',component:Registration
    },
  

    { path: "", redirectTo: "dashboard", pathMatch: "full" }

];
