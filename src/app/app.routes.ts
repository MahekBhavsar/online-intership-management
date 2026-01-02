import { Routes } from '@angular/router';
import { StaffLogin } from './staff-login/staff-login';

export const routes: Routes = [
    {
        path:'staff-login',
        component:StaffLogin
    },
    {
        path:'',
        redirectTo:'staff-login',
        pathMatch:'full'
    }
];
