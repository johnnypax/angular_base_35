import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contatore } from './contatore/contatore';

@Component({
  imports: [Contatore],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('lez02_angular_progettino');
}
