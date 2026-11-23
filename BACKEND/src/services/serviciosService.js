const Servicio = require("../models/Servicio");
const database = require("../config/database");

class serviciosService {
    #servicios;
    constructor() {
        this.#servicios = [];
    }

    async crearServicio(datosServicio) {
        const nuevoServicio = new Servicio(
            datosServicio.idServicio,
            datosServicio.nombre,
            datosServicio.descripcion,
            datosServicio.precio,
            datosServicio.estado
        );
    }
    async consultarServicios() {
    }
    async consultarServicioPorId(id) {
    }
    async actualizarServicio(datosServicio) {
    }
    async eliminarServicio(id) {
    }
}

module.exports = serviciosService;
