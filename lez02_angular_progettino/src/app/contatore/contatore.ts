import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-contatore',
  styleUrl: './contatore.css',
  templateUrl: './contatore.html',
})
export class Contatore {
  presenza : number = 0;

  funzAggiungi(): void {
    this.presenza += 1;
  }

  funzRimuovi(): void {
    if (this.presenza > 0) {
      this.presenza -= 1;
    }
  }
}
