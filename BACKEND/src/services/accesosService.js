const acceso = require("../models/acceso");
const database = require("../config/database");

class AccesosService {
    #accessos;
    constructor() {
        this.#accessos = []
    }

    async crearAcceso(datosaAcceso) {
        const nuevoAcceso = new acceso(
            datosaAcceso.idAcceso,
            datosaAcceso.idUsuario,
            datosaAcceso.tipoAccion,
            datosaAcceso.fechaHora,
            datosaAcceso.ipOrigen,
            datosaAcceso.resultado);
    }
    async consultarAccesos() {
    }
    async consultarAccesoPorId(id) {
    }
    async actualizarAcceso(datosAcceso) {
    }
    async eliminarAcceso(id) {
    }

}

module.exports = AccesosService;