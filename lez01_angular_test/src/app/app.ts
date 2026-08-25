import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompoUno } from './compo-uno/compo-uno';
import { CompoDue } from './compo-due/compo-due';

@Component({
  imports: [CompoUno, CompoDue],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
