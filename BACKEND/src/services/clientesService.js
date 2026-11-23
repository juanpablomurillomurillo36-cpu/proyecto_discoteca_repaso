const Cliente = require("../models/Cliente");
const database = require("../config/database");

class clientesService {
    #clientes;
    constructor() {
        this.#clientes = [];
    }

    async crearCliente(datosCliente) {
        const nuevoCliente = new Cliente(
            datosCliente.idCliente,
            datosCliente.idCategoriaCliente,
            datosCliente.primerNombre,
            datosCliente.segundoNombre,
            datosCliente.primerApellido,
            datosCliente.segundoApellido,
            datosCliente.documento,
            datosCliente.telefono,
            datosCliente.email,
            datosCliente.fechaNacimiento,
            datosCliente.esVip,
            datosCliente.estado,
            datosCliente.puntosAcumulados
        );
    }
    async consultarClientes() {
    }
    async consultarClientePorId(id) {
    }
    async actualizarCliente(datosCliente) {
    }
    async eliminarCliente(id) {
    }
}

module.exports = clientesService;
