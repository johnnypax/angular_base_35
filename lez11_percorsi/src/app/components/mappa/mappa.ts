import { Component } from '@angular/core';
import { PoiService } from '../../services/poi-service';
import { Poi } from '../../models/poi';

@Component({
  imports: [],
  selector: 'app-mappa',
  styleUrl: './mappa.css',
  templateUrl: './mappa.html',
})
export class Mappa {

  lista: Poi[] = []

  constructor(private servicePoi: PoiService){

  }

  async ngOnInit(){
    // this.lista = await this.servicePoi.getAll()
    // console.log(this.lista)

    this.servicePoi.getAll().then(result => {
      this.lista = result;
      console.log(this.lista)
    })

  }

}
