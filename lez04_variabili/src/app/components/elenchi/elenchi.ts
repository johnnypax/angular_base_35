import { Component } from '@angular/core';
import { Studente } from '../../models/studente';

@Component({
  imports: [],
  selector: 'app-elenchi',
  styleUrl: './elenchi.css',
  templateUrl: './elenchi.html',
})
export class Elenchi {

  nome? : string;

  ingredienti : string[] = ["Arachidi", "Uova", "Yogurt"]

  studenti : Studente[] = []

  constructor(){
    this.studenti.push( new Studente(1, "Giovanni Pace", "AB12345") );
    this.studenti.push( new Studente(2, "Valeria Verdi", "AB12346") );
    this.studenti.push( new Studente(3, "Marika Mariko", "AB12347") );
  }

  aggiungiStudente(): void{
    this.studenti.push( new Studente(1, "Mario Rossi", "AB12348") );
  }

  svelaNome(): void{
    this.nome = "Giovanni Pace"
  }

}
