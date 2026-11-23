const Compra = require("../models/Compra");
const database = require("../config/database");

class comprasService {
    #compras;
    constructor() {
        this.#compras = [];
    }

    async crearCompra(datosCompra) {
        const nuevaCompra = new Compra(
            datosCompra.idCompra,
            datosCompra.idProveedor,
            datosCompra.fechaCompra,
            datosCompra.total,
            datosCompra.estado
        );
    }
    async consultarCompras() {
    }
    async consultarCompraPorId(id) {
    }
    async actualizarCompra(datosCompra) {
    }
    async eliminarCompra(id) {
    }
}

module.exports = comprasService;
