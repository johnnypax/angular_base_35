import { Component } from '@angular/core';
import { FilmService } from '../../services/film-service';
import { Film } from '../../models/film';

@Component({
  imports: [],
  selector: 'app-lista',
  styleUrl: './lista.css',
  templateUrl: './lista.html',
})
export class Lista {

  listaFilm: Film[] = []

  // private services: FilmService | undefined
  
  // constructor(serviceFilm: FilmService){ 
  //   this.serviceFilm = serviceFilm
  // }

  constructor(private serviceFilm: FilmService){ }

  ngOnInit(){
    this.listaFilm = this.serviceFilm.recuperaElenco();
  }
}
