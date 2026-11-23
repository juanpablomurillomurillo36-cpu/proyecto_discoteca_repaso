const Rol = require("../models/Rol");
const database = require("../config/database");

class rolesService {
    #roles;
    constructor() {
        this.#roles = [];
    }

    async crearRol(datosRol) {
        const nuevoRol = new Rol(
            datosRol.idRol,
            datosRol.nombreRol,
            datosRol.descripcion,
            datosRol.estado,
            datosRol.fechaCreacion
        );
    }
    async consultarRoles() {
    }
    async consultarRolPorId(id) {
    }
    async actualizarRol(datosRol) {
    }
    async eliminarRol(id) {
    }
}

module.exports = rolesService;
