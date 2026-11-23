const DetallesVenta = require("../models/DetallesVenta");
const database = require("../config/database");

class detallesVentasService {
    #detallesVentas;
    constructor() {
        this.#detallesVentas = [];
    }

    async crearDetalleVenta(datosDetalleVenta) {
        const nuevoDetalleVenta = new DetallesVenta(
            datosDetalleVenta.idDetalleVenta,
            datosDetalleVenta.idVenta,
            datosDetalleVenta.idProducto,
            datosDetalleVenta.cantidad,
            datosDetalleVenta.precioUnitario,
            datosDetalleVenta.subtotal
        );
    }
    async consultarDetallesVentas() {
    }
    async consultarDetalleVentaPorId(id) {
    }
    async actualizarDetalleVenta(datosDetalleVenta) {
    }
    async eliminarDetalleVenta(id) {
    }
}

module.exports = detallesVentasService;
