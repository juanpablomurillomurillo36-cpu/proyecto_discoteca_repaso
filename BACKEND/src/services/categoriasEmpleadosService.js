const CategoriaEmpleado = require("../models/CategoriaEmpleado");
const database = require("../config/database");

class categoriasEmpleadosService {
    #categoriasEmpleados;
    constructor() {
        this.#categoriasEmpleados = [];
    }

    async crearCategoriaEmpleado(datosCategoriaEmpleado) {
        const nuevaCategoriaEmpleado = new CategoriaEmpleado(
            datosCategoriaEmpleado.idCategoriaEmpleado,
            datosCategoriaEmpleado.nombre,
            datosCategoriaEmpleado.descripcion,
            datosCategoriaEmpleado.estado
        );
    }
    async consultarCategoriasEmpleados() {
    }
    async consultarCategoriaEmpleadoPorId(id) {
    }
    async actualizarCategoriaEmpleado(datosCategoriaEmpleado) {
    }
    async eliminarCategoriaEmpleado(id) {
    }
}

module.exports = categoriasEmpleadosService;
