export class Film {
    id: number | undefined
    immagine: string | undefined
    titolo: string | undefined
    descrizione: string | undefined
    anno: number | undefined
    regista: string | undefined

    constructor(varId?: number, varImg?: string, varTitolo?: string, varDesc?: string, varAnno?: number, varRegista?: string){
        this.id = varId
        this.immagine = varImg
        this.titolo = varTitolo
        this.descrizione = varDesc
        this.anno = varAnno
        this.regista = varRegista
    }
}
