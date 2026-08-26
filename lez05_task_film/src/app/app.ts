import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lista } from './components/lista/lista';
import { Inserimento } from './components/inserimento/inserimento';

@Component({
  imports: [RouterOutlet, Lista, Inserimento],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('lez05_task_film');
}
