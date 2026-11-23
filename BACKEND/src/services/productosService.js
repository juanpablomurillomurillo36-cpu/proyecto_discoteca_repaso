const Producto = require("../models/Producto");
const database = require("../config/database");

class productosService {
    #productos;
    constructor() {
        this.#productos = [];
    }

    async crearProducto(datosProducto) {
        const nuevoProducto = new Producto(
            datosProducto.idProducto,
            datosProducto.nombre,
            datosProducto.descripcion,
            datosProducto.precioVenta,
            datosProducto.stockActual,
            datosProducto.stockMinimo,
            datosProducto.stockMaximo,
            datosProducto.estado
        );
    }
    async consultarProductos() {
    }
    async consultarProductoPorId(id) {
    }
    async actualizarProducto(datosProducto) {
    }
    async eliminarProducto(id) {
    }
}

module.exports = productosService;
