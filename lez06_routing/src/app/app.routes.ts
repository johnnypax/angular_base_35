import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ChiSiamo } from './components/chi-siamo/chi-siamo';
import { Contatti } from './components/contatti/contatti';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full"},
    { path: "home", component: Home },
    { path: "chi-siamo", component: ChiSiamo },
    { path: "contatti", component: Contatti },
];
