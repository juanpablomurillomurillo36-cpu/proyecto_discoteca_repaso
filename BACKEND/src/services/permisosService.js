const Permiso = require("../models/Permiso");
const database = require("../config/database");

class permisosService {
    #permisos;
    constructor() {
        this.#permisos = [];
    }

    async crearPermiso(datosPermiso) {
        const nuevoPermiso = new Permiso(
            datosPermiso.idPermiso,
            datosPermiso.nombrePermiso,
            datosPermiso.descripcion,
            datosPermiso.estado
        );
    }
    async consultarPermisos() {
    }
    async consultarPermisoPorId(id) {
    }
    async actualizarPermiso(datosPermiso) {
    }
    async eliminarPermiso(id) {
    }
}

module.exports = permisosService;
