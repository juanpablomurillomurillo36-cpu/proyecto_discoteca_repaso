const AgendaEmpleado = require("../models/AgendaEmpleado");
const database = require("../config/database");

class agendaEmpleadosService {
    #agendasEmpleados;
    constructor() {
        this.#agendasEmpleados = [];
    }

    async crearAgendaEmpleado(datosAgendaEmpleado) {
        const nuevaAgendaEmpleado = new AgendaEmpleado(
            datosAgendaEmpleado.idAgendaEmpleado,
            datosAgendaEmpleado.idEmpleados,
            datosAgendaEmpleado.idServicios,
            datosAgendaEmpleado.idEvento,
            datosAgendaEmpleado.fecha,
            datosAgendaEmpleado.horaInicio,
            datosAgendaEmpleado.horaFin,
            datosAgendaEmpleado.estado
        );
    }
    async consultarAgendasEmpleados() {
    }
    async consultarAgendaEmpleadoPorId(id) {
    }
    async actualizarAgendaEmpleado(datosAgendaEmpleado) {
    }
    async eliminarAgendaEmpleado(id) {
    }
}

module.exports = agendaEmpleadosService;
