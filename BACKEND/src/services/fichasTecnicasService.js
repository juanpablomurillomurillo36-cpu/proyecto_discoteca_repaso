const FichaTecnica = require("../models/FichaTecnica");
const database = require("../config/database");

class fichasTecnicasService {
    #fichasTecnicas;
    constructor() {
        this.#fichasTecnicas = [];
    }

    async crearFichaTecnica(datosFichaTecnica) {
        const nuevaFichaTecnica = new FichaTecnica(
            datosFichaTecnica.idFichaTecnica,
            datosFichaTecnica.idEvento,
            datosFichaTecnica.tematica,
            datosFichaTecnica.franjaHoraria,
            datosFichaTecnica.cantidadInvitados,
            datosFichaTecnica.observaciones
        );
    }
    async consultarFichasTecnicas() {
    }
    async consultarFichaTecnicaPorId(id) {
    }
    async actualizarFichaTecnica(datosFichaTecnica) {
    }
    async eliminarFichaTecnica(id) {
    }
}

module.exports = fichasTecnicasService;
