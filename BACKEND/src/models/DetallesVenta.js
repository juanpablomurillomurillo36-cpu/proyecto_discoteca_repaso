class DetallesVenta {
  #idDetalleVenta;
  #idVenta;
  #idProducto;
  #cantidad;
  #precioUnitario;
  #subtotal;

  constructor(idDetalleVenta, idVenta, idProducto, cantidad, precioUnitario, subtotal) {
    this.#idDetalleVenta = idDetalleVenta;
    this.#idVenta = idVenta;
    this.#idProducto = idProducto;
    this.#cantidad = cantidad;
    this.#precioUnitario = precioUnitario;
    this.#subtotal = subtotal;
  }

  getIdDetalleVenta() {
    return this.#idDetalleVenta;
  }

  setIdDetalleVenta(idDetalleVenta) {
    this.#idDetalleVenta = idDetalleVenta;
  }

  getIdVenta() {
    return this.#idVenta;
  }

  setIdVenta(idVenta) {
    this.#idVenta = idVenta;
  }

  getIdProducto() {
    return this.#idProducto;
  }

  setIdProducto(idProducto) {
    this.#idProducto = idProducto;
  }

  getCantidad() {
    return this.#cantidad;
  }

  setCantidad(cantidad) {
    this.#cantidad = cantidad;
  }

  getPrecioUnitario() {
    return this.#precioUnitario;
  }

  setPrecioUnitario(precioUnitario) {
    this.#precioUnitario = precioUnitario;
  }

  getSubtotal() {
    return this.#subtotal;
  }

  setSubtotal(subtotal) {
    this.#subtotal = subtotal;
  }

  toJSON() {
    return {
      idDetalleVenta: this.#idDetalleVenta,
      idVenta: this.#idVenta,
      idProducto: this.#idProducto,
      cantidad: this.#cantidad,
      precioUnitario: this.#precioUnitario,
      subtotal: this.#subtotal
    };
  }
}

module.exports = DetallesVenta;