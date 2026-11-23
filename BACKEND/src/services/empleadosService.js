const Empleado = require("../models/Empleado");
const database = require("../config/database");

class empleadosService {
    #empleados;
    constructor() {
        this.#empleados = [];
    }

    async crearEmpleado(datosEmpleado) {
        const nuevoEmpleado = new Empleado(
            datosEmpleado.idEmpleado,
            datosEmpleado.idCategoriaEmpleado,
            datosEmpleado.primerNombre,
            datosEmpleado.segundoNombre,
            datosEmpleado.primerApellido,
            datosEmpleado.segundoApellido,
            datosEmpleado.documento,
            datosEmpleado.telefono,
            datosEmpleado.email,
            datosEmpleado.estado
        );
    }
    async consultarEmpleados() {
    }
    async consultarEmpleadoPorId(id) {
    }
    async actualizarEmpleado(datosEmpleado) {
    }
    async eliminarEmpleado(id) {
    }
}

module.exports = empleadosService;
