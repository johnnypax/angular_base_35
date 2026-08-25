export class Studente {
    id?: number
    nominativo?: string
    matricola: string = "N.D."

    constructor(varId: number, varNominativo: string, varMatricola: string){
        this.id = varId;
        this.nominativo = varNominativo;
        this.matricola = varMatricola;
    }
}
