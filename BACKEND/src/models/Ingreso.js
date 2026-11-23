class Ingreso {
  #idIngreso;
  #idCliente;
  #idReserva;
  #fecha;
  #hora;
  #puertaAcceso;
  #tipoDispositivo;
  #validadoPor;
  #estado;

  constructor(
    idIngreso,
    idCliente,
    idReserva,
    fecha,
    hora,
    puertaAcceso,
    tipoDispositivo,
    validadoPor,
    estado
  ) {
    this.#idIngreso = idIngreso;
    this.#idCliente = idCliente;
    this.#idReserva = idReserva;
    this.#fecha = fecha;
    this.#hora = hora;
    this.#puertaAcceso = puertaAcceso;
    this.#tipoDispositivo = tipoDispositivo;
    this.#validadoPor = validadoPor;
    this.#estado = estado;
  }

  getIdIngreso() {
    return this.#idIngreso;
  }

  setIdIngreso(idIngreso) {
    this.#idIngreso = idIngreso;
  }

  getIdCliente() {
    return this.#idCliente;
  }

  setIdCliente(idCliente) {
    this.#idCliente = idCliente;
  }

  getIdReserva() {
    return this.#idReserva;
  }

  setIdReserva(idReserva) {
    this.#idReserva = idReserva;
  }

  getFecha() {
    return this.#fecha;
  }

  setFecha(fecha) {
    this.#fecha = fecha;
  }

  getHora() {
    return this.#hora;
  }

  setHora(hora) {
    this.#hora = hora;
  }

  getPuertaAcceso() {
    return this.#puertaAcceso;
  }

  setPuertaAcceso(puertaAcceso) {
    this.#puertaAcceso = puertaAcceso;
  }

  getTipoDispositivo() {
    return this.#tipoDispositivo;
  }

  setTipoDispositivo(tipoDispositivo) {
    this.#tipoDispositivo = tipoDispositivo;
  }

  getValidadoPor() {
    return this.#validadoPor;
  }

  setValidadoPor(validadoPor) {
    this.#validadoPor = validadoPor;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idIngreso: this.#idIngreso,
      idCliente: this.#idCliente,
      idReserva: this.#idReserva,
      fecha: this.#fecha,
      hora: this.#hora,
      puertaAcceso: this.#puertaAcceso,
      tipoDispositivo: this.#tipoDispositivo,
      validadoPor: this.#validadoPor,
      estado: this.#estado
    };
  }
}

module.exports = Ingreso;