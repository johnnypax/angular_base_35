import { Component } from '@angular/core';
import { Cve } from '../../models/cve';
import { CveService } from '../../services/cve-service';

@Component({
  imports: [],
  selector: 'app-lista',
  styleUrl: './lista.css',
  templateUrl: './lista.html',
})
export class Lista {

  elenco: Cve[] = []

  constructor(private service: CveService){}

  ngOnInit(){
    this.elenco = this.service.recuperaElenco();
  }

  elimina(varId?: number): void{
    // console.log(varId)
    if(!varId){
      return;
    }
    this.service.eliminaCve(varId)
  }

}
