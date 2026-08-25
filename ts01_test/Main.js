var Impiegato = /** @class */ (function () {
    function Impiegato(varNome, varCognome, varEta) {
        this.nome = varNome;
        this.cognome = varCognome;
        this.eta = varEta;
    }
    Impiegato.prototype.stampa = function () {
        console.log("[Impiegato] ".concat(this.nome, " ").concat(this.cognome, " ").concat(this.eta));
    };
    return Impiegato;
}());
var gio = new Impiegato("Giovanni", "Pace", 37);
gio.stampa();
