const Venta = require("../models/Venta");
const database = require("../config/database");

class ventasService {
    #ventas;
    constructor() {
        this.#ventas = [];
    }

    async crearVenta(datosVenta) {
        const nuevaVenta = new Venta(
            datosVenta.idVenta,
            datosVenta.idCliente,
            datosVenta.fechaVenta,
            datosVenta.total,
            datosVenta.metodoPago,
            datosVenta.comprobanteNo,
            datosVenta.estado,
            datosVenta.puntos
        );
    }
    async consultarVentas() {
    }
    async consultarVentaPorId(id) {
    }
    async actualizarVenta(datosVenta) {
    }
    async eliminarVenta(id) {
    }
}

module.exports = ventasService;
