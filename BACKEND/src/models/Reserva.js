class Reserva {
  #idReserva;
  #idCliente;
  #tipoEspacio;
  #fecha;
  #hora;
  #descuento;
  #estado;
  #codigoQr;

  constructor(idReserva, idCliente, tipoEspacio, fecha, hora, descuento, estado, codigoQr) {
    this.#idReserva = idReserva;
    this.#idCliente = idCliente;
    this.#tipoEspacio = tipoEspacio;
    this.#fecha = fecha;
    this.#hora = hora;
    this.#descuento = descuento;
    this.#estado = estado;
    this.#codigoQr = codigoQr;
  }

  getIdReserva() {
    return this.#idReserva;
  }

  setIdReserva(idReserva) {
    this.#idReserva = idReserva;
  }

  getIdCliente() {
    return this.#idCliente;
  }

  setIdCliente(idCliente) {
    this.#idCliente = idCliente;
  }

  getTipoEspacio() {
    return this.#tipoEspacio;
  }

  setTipoEspacio(tipoEspacio) {
    this.#tipoEspacio = tipoEspacio;
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

  getDescuento() {
    return this.#descuento;
  }

  setDescuento(descuento) {
    this.#descuento = descuento;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  getCodigoQr() {
    return this.#codigoQr;
  }

  setCodigoQr(codigoQr) {
    this.#codigoQr = codigoQr;
  }

  toJSON() {
    return {
      idReserva: this.#idReserva,
      idCliente: this.#idCliente,
      tipoEspacio: this.#tipoEspacio,
      fecha: this.#fecha,
      hora: this.#hora,
      descuento: this.#descuento,
      estado: this.#estado,
      codigoQr: this.#codigoQr
    };
  }
}

module.exports = Reserva;