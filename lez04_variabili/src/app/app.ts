import { Component, signal } from '@angular/core';
import { Elenchi } from './components/elenchi/elenchi';
import { Inserimento } from './components/inserimento/inserimento';

@Component({
  imports: [Elenchi, Inserimento],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('lez04_variabili');
}
