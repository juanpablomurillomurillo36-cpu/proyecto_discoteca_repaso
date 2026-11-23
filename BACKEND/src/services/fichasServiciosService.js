const FichaServicio = require("../models/FichaServicio");
const database = require("../config/database");

class fichasServiciosService {
    #fichasServicios;
    constructor() {
        this.#fichasServicios = [];
    }

    async crearFichaServicio(datosFichaServicio) {
        const nuevaFichaServicio = new FichaServicio(
            datosFichaServicio.idFichaTecnica,
            datosFichaServicio.idServicio,
            datosFichaServicio.cantidadRequerida
        );
    }
    async consultarFichasServicios() {
    }
    async consultarFichaServicioPorId(id) {
    }
    async actualizarFichaServicio(datosFichaServicio) {
    }
    async eliminarFichaServicio(id) {
    }
}

module.exports = fichasServiciosService;
