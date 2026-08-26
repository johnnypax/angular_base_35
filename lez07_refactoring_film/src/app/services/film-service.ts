import { Service } from '@angular/core';
import { Film } from '../models/film';

@Service()
export class FilmService {

    private elenco: Film[] = []

    constructor(){
        this.elenco.push(
            new Film(1, "https://picsum.photos/200/300", "Inception", "Belo belo", 2005, "Nolan"))
        this.elenco.push(
            new Film(2, "https://picsum.photos/200/300", "Odissea", "Al cinema sbagliato", 2026, "Nolan"))
        }

    recuperaElenco(): Film[] {
        return this.elenco;
    }

    inserisciInElenco(f:Film): boolean{
        if(this.elenco.push(f) > 0)
            return true

        return false
    }
}
