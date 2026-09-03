export class Cve {
    id?: number
    descrizione?: string
    data_scoperta?: any
    vettore?: string

    constructor(varId?: number, varDesc?: string, varDat?: any, varVet?: string){
        this.id = varId
        this.descrizione = varDesc
        this.data_scoperta = varDat
        this.vettore = varVet
    }
}
