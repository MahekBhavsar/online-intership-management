import { Routes } from '@angular/router';
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
];
