import { Component, signal } from '@angular/core';
import { Uno } from './components/uno/uno';
import { Due } from './components/due/due';

@Component({
  imports: [Uno, Due],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
  constructor(){
    console.log("Sono il costruttore di APP.ts");
  }

}
