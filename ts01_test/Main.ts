class Impiegato{
    nome: string;
    cognome: string;
    eta: number;

    constructor(varNome: string, varCognome: string, varEta: number){
        this.nome = varNome;
        this.cognome = varCognome;
        this.eta = varEta;
    }

    stampa(): void{
        console.log(`[Impiegato] ${this.nome} ${this.cognome} ${this.eta}`)
    }
}

let gio = new Impiegato("Giovanni", "Pace", 37);
gio.stampa();