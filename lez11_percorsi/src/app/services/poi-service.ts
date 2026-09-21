import { Service } from '@angular/core';
import { Poi } from '../models/poi';

@Service()
export class PoiService {

    async getAll() : Promise<Poi[]> {
        const response = await fetch("http://localhost:3000/poi");
        const elenco: Poi[] = await response.json();

        return elenco;
    } 

    async getById(varId: number) : Promise<Poi> {
        const response = await fetch(`http://localhost:3000/poi/${varId}/full`);
        const oggetto: Poi = await response.json();

        return oggetto;
    } 
}
