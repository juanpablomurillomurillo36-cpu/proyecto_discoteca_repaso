const DetallesCompra = require("../models/DetallesCompra");
const database = require("../config/database");

class detallesComprasService {
    #detallesCompras;
    constructor() {
        this.#detallesCompras = [];
    }

    async crearDetalleCompra(datosDetalleCompra) {
        const nuevoDetalleCompra = new DetallesCompra(
            datosDetalleCompra.idDetalleCompra,
            datosDetalleCompra.idCompra,
            datosDetalleCompra.idProducto,
            datosDetalleCompra.cantidad,
            datosDetalleCompra.precioUnitario,
            datosDetalleCompra.subtotal
        );
    }
    async consultarDetallesCompras() {
    }
    async consultarDetalleCompraPorId(id) {
    }
    async actualizarDetalleCompra(datosDetalleCompra) {
    }
    async eliminarDetalleCompra(id) {
    }
}

module.exports = detallesComprasService;
