import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CveService } from '../../services/cve-service';

@Component({
  imports: [],
  selector: 'app-dettaglio',
  styleUrl: './dettaglio.css',
  templateUrl: './dettaglio.html',
})
export class Dettaglio {

  desc?: string
  data?: any
  vett?: string

  constructor(private rotta_attiva: ActivatedRoute, private service: CveService){

  }

  ngOnInit(){
    this.rotta_attiva.params.subscribe(risultato => {
      let identficativo : number = parseInt(risultato['id'])
      console.log(identficativo)

      let cveTrovata = this.service.cercaCve(identficativo)
      console.log(cveTrovata)

      this.desc = cveTrovata?.descrizione
      this.data = cveTrovata?.data_scoperta
      this.vett = cveTrovata?.vettore
    })
  }

}
