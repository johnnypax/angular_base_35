import { Component } from '@angular/core';
import { Cve } from '../../models/cve';
import { FormsModule } from '@angular/forms';
import { CveService } from '../../services/cve-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-inserimento',
  styleUrl: './inserimento.css',
  templateUrl: './inserimento.html',
})
export class Inserimento {

  input_desc?: string
  input_date?: string
  input_vect?: string

  constructor(private service: CveService, private router: Router){}

  salva(): void{
    if(!this.input_desc || this.input_desc.trim() == ""){
      alert("Descrizione obbligatoria!")
      return;
    }
    if(!this.input_date || this.input_date.trim() == ""){
      alert("Descrizione obbligatoria!")
      return;
    }
    if(!this.input_vect || this.input_vect.trim() == ""){
      alert("Descrizione obbligatoria!")
      return;
    }

    if(this.service.inserisciCve(this.input_desc, this.input_date, this.input_vect)){
      alert("STAPPOOOOO")
      this.router.navigateByUrl("lista")
    }
    else{
      alert("ERRORE")
    }
  }

}
