import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../../models/film';
import { FilmService } from '../../services/film-service';

@Component({
  imports: [FormsModule],
  selector: 'app-inserimento',
  styleUrl: './inserimento.css',
  templateUrl: './inserimento.html',
})
export class Inserimento {

  inputImg: string | undefined
  inputTitolo: string | undefined
  inputDesc: string | undefined
  inputAnno: number | undefined
  inputRegista: string | undefined

  constructor(private serviceFilm: FilmService){}

  salvaFilm(): void{
    //Controlla input...
    let film = new Film(0, this.inputImg, this.inputTitolo, this.inputDesc, this.inputAnno, this.inputRegista)
    if(this.serviceFilm.inserisciInElenco(film))
      alert("STAPPOOOOOO")
    else
      alert("ERRORONE")
  }

}
