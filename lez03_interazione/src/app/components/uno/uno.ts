import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-uno',
  styleUrl: './uno.css',
  templateUrl: './uno.html',
})
export class Uno {

  constructor(){
    console.log("Sono il costruttore di UNO.ts");
  }

}
