import { Routes } from '@angular/router';
import { Lista } from './components/lista/lista';
import { Inserimento } from './components/inserimento/inserimento';
import { Dettaglio } from './components/dettaglio/dettaglio';

export const routes: Routes = [
    { path: "", redirectTo: "lista", pathMatch: "full" },
    { path: "lista", component: Lista },
    { path: "inserimento", component: Inserimento},
    { path: "cve/:id", component: Dettaglio}                // cve/895
];