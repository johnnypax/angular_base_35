import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Studente } from '../../models/studente';

@Component({
  imports: [FormsModule],
  selector: 'app-inserimento',
  styleUrl: './inserimento.css',
  templateUrl: './inserimento.html',
})
export class Inserimento {

  inputNominativo?: string;
  inputMatricola?: string;

  elenco: Studente[] = [];

  salvaStudente(): void{
    // console.log(this.inputMatricola, this.inputNominativo)

    if(this.inputNominativo && this.inputMatricola){
      let stu = new Studente(this.elenco.length+1, this.inputNominativo, this.inputMatricola);
      this.elenco.push(stu)
    }

    this.inputNominativo = "";
    this.inputMatricola = "";
  }
}
