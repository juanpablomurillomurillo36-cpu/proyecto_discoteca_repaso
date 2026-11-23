class Venta {
  #idVenta;
  #idCliente;
  #fechaVenta;
  #total;
  #metodoPago;
  #comprobanteNo;
  #estado;
  #puntos;

  constructor(idVenta, idCliente, fechaVenta, total, metodoPago, comprobanteNo, estado, puntos) {
    this.#idVenta = idVenta;
    this.#idCliente = idCliente;
    this.#fechaVenta = fechaVenta;
    this.#total = total;
    this.#metodoPago = metodoPago;
    this.#comprobanteNo = comprobanteNo;
    this.#estado = estado;
    this.#puntos = puntos;
  }

  getIdVenta() {
    return this.#idVenta;
  }

  setIdVenta(idVenta) {
    this.#idVenta = idVenta;
  }

  getIdCliente() {
    return this.#idCliente;
  }

  setIdCliente(idCliente) {
    this.#idCliente = idCliente;
  }

  getFechaVenta() {
    return this.#fechaVenta;
  }

  setFechaVenta(fechaVenta) {
    this.#fechaVenta = fechaVenta;
  }

  getTotal() {
    return this.#total;
  }

  setTotal(total) {
    this.#total = total;
  }

  getMetodoPago() {
    return this.#metodoPago;
  }

  setMetodoPago(metodoPago) {
    this.#metodoPago = metodoPago;
  }

  getComprobanteNo() {
    return this.#comprobanteNo;
  }

  setComprobanteNo(comprobanteNo) {
    this.#comprobanteNo = comprobanteNo;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  getPuntos() {
    return this.#puntos;
  }

  setPuntos(puntos) {
    this.#puntos = puntos;
  }

  toJSON() {
    return {
      idVenta: this.#idVenta,
      idCliente: this.#idCliente,
      fechaVenta: this.#fechaVenta,
      total: this.#total,
      metodoPago: this.#metodoPago,
      comprobanteNo: this.#comprobanteNo,
      estado: this.#estado,
      puntos: this.#puntos
    };
  }
}

module.exports = Venta;