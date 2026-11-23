const AgendaEvento = require("../models/AgendaEvento");
const database = require("../config/database");

class agendaEventosService {
    #agendasEventos;
    constructor() {
        this.#agendasEventos = [];
    }

    async crearAgendaEvento(datosAgendaEvento) {
        const nuevaAgendaEvento = new AgendaEvento(
            datosAgendaEvento.idAgendaEvento,
            datosAgendaEvento.idEvento,
            datosAgendaEvento.fecha,
            datosAgendaEvento.hora,
            datosAgendaEvento.descripcion,
            datosAgendaEvento.estado
        );
    }
    async consultarAgendasEventos() {
    }
    async consultarAgendaEventoPorId(id) {
    }
    async actualizarAgendaEvento(datosAgendaEvento) {
    }
    async eliminarAgendaEvento(id) {
    }
}

module.exports = agendaEventosService;
