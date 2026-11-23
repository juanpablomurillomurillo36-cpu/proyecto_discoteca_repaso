const CategoriaCliente = require("../models/CategoriaCliente");
const database = require("../config/database");

class categoriasClientesService {
    #categoriasClientes;
    constructor() {
        this.#categoriasClientes = [];
    }

    async crearCategoriaCliente(datosCategoriaCliente) {
        const nuevaCategoriaCliente = new CategoriaCliente(
            datosCategoriaCliente.idCategoriaCliente,
            datosCategoriaCliente.nombre,
            datosCategoriaCliente.descripcion,
            datosCategoriaCliente.estado
        );
    }
    async consultarCategoriasClientes() {
    }
    async consultarCategoriaClientePorId(id) {
    }
    async actualizarCategoriaCliente(datosCategoriaCliente) {
    }
    async eliminarCategoriaCliente(id) {
    }
}

module.exports = categoriasClientesService;
