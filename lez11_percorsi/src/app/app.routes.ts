import { Routes } from '@angular/router';
import { Mappa } from './components/mappa/mappa';
import { Singolo } from './components/singolo/singolo';

export const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: "full"},
    { path: "list", component: Mappa},
    { path: "path/:id", component: Singolo}
];
