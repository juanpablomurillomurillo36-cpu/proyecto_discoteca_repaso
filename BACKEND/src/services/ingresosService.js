const Ingreso = require("../models/Ingreso");
const database = require("../config/database");

class ingresosService {
    #ingresos;
    constructor() {
        this.#ingresos = [];
    }

    async crearIngreso(datosIngreso) {
        const nuevoIngreso = new Ingreso(
            datosIngreso.idIngreso,
            datosIngreso.idCliente,
            datosIngreso.idReserva,
            datosIngreso.fecha,
            datosIngreso.hora,
            datosIngreso.puertaAcceso,
            datosIngreso.tipoDispositivo,
            datosIngreso.validadoPor,
            datosIngreso.estado
        );
    }
    async consultarIngresos() {
    }
    async consultarIngresoPorId(id) {
    }
    async actualizarIngreso(datosIngreso) {
    }
    async eliminarIngreso(id) {
    }
}

module.exports = ingresosService;
