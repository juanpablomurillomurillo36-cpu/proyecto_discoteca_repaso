const Usuario = require("../models/Usuario");
const database = require("../config/database");

class usuariosService {
    #usuarios;
    constructor() {
        this.#usuarios = [];
    }

    async crearUsuario(datosUsuario) {
        const nuevoUsuario = new Usuario(
            datosUsuario.idUsuario,
            datosUsuario.idRol,
            datosUsuario.primerNombre,
            datosUsuario.segundoNombre,
            datosUsuario.primerApellido,
            datosUsuario.segundoApellido,
            datosUsuario.email,
            datosUsuario.contrasenaHash,
            datosUsuario.telefono,
            datosUsuario.estado,
            datosUsuario.fechaCreacion
        );
    }
    async consultarUsuarios() {
    }
    async consultarUsuarioPorId(id) {
    }
    async actualizarUsuario(datosUsuario) {
    }
    async eliminarUsuario(id) {
    }
}

module.exports = usuariosService;
