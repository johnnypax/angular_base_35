import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-compo-uno',
  styleUrl: './compo-uno.css',
  templateUrl: './compo-uno.html',
})
export class CompoUno {

  nome: string | undefined = "Mario";
  cognome: string = "Rossi";

  funzioneCliccami(): void{
    console.log("Ciao Giovanni");
  }

  cambiaNomeCognome(): void{
    this.nome = "Giovanni"
    this.cognome = "Pace"
  }

}
