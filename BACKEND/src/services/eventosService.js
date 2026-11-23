const Evento = require("../models/Evento");
const database = require("../config/database");

class eventosService {
    #eventos;
    constructor() {
        this.#eventos = [];
    }

    async crearEvento(datosEvento) {
        const nuevoEvento = new Evento(
            datosEvento.idEvento,
            datosEvento.nombre,
            datosEvento.tematica,
            datosEvento.fecha,
            datosEvento.horaInicio,
            datosEvento.horaFin,
            datosEvento.estado
        );
    }
    async consultarEventos() {
    }
    async consultarEventoPorId(id) {
    }
    async actualizarEvento(datosEvento) {
    }
    async eliminarEvento(id) {
    }
}

module.exports = eventosService;
