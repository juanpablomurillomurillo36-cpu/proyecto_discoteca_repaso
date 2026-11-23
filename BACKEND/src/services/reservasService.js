const Reserva = require("../models/Reserva");
const database = require("../config/database");

class reservasService {
    #reservas;
    constructor() {
        this.#reservas = [];
    }

    async crearReserva(datosReserva) {
        const nuevaReserva = new Reserva(
            datosReserva.idReserva,
            datosReserva.idCliente,
            datosReserva.tipoEspacio,
            datosReserva.fecha,
            datosReserva.hora,
            datosReserva.descuento,
            datosReserva.estado,
            datosReserva.codigoQr
        );
    }
    async consultarReservas() {
    }
    async consultarReservaPorId(id) {
    }
    async actualizarReserva(datosReserva) {
    }
    async eliminarReserva(id) {
    }
}

module.exports = reservasService;
