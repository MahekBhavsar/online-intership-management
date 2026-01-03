import { Routes } from '@angular/router';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManageApplication } from './admin/manage-application/manage-application';
import { ManagedCourse } from './admin/managed-course/managed-course';
import { ManagedPIntershiprogram } from './admin/managed-intership-program/managed-intership-program';
import { ManagedStaff } from './admin/managed-staff/managed-staff';
import { Login } from './users/login/login';
import { StaffTimetable } from './admin/staff-timetable/staff-timetable';
import { Dashboard } from './users/dashboard/dashboard';
import { Footer } from './users/footer/footer';
import { Header } from './users/header/header';
import { Navbar } from './users/navbar/navbar';
import { Registration } from './users/registration/registration';
import { PrivacyPolicy } from './users/privacy-policy/privacy-policy';
import { TermsAndCondition } from './users/terms-and-condition/terms-and-condition';


export const routes: Routes = [
    { path: "dashboard", component: Dashboard },

    { path: "navbar", component: Navbar },

    { path: "header", component: Header },

    { path: "footer", component: Footer },

    { path: "privacy-policy", component: PrivacyPolicy },

    { path: "terms", component: TermsAndCondition },

    { path: 'users/registration', component: Registration },

    { path: 'users/login', component: Login },

    { path: 'admin/dashboard', component: AdminDashboard },

    { path: 'admin/manage-application', component: ManageApplication },

    { path: 'admin/managed-intership', component: ManagedPIntershiprogram },

    { path: 'admin/managed-course', component: ManagedCourse },

    { path: 'admin/managed-staff', component: ManagedStaff },

    { path: 'admin/staff-timetable', component: StaffTimetable },

    { path: 'admin/staff-timetable', component: StaffTimetable },

    { path: "", redirectTo: "users/dashboard", pathMatch: "full" }

];