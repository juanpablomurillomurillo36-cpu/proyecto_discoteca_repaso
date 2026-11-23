class DetallesCompra {
  #idDetalleCompra;
  #idCompra;
  #idProducto;
  #cantidad;
  #precioUnitario;
  #subtotal;

  constructor(idDetalleCompra, idCompra, idProducto, cantidad, precioUnitario, subtotal) {
    this.#idDetalleCompra = idDetalleCompra;
    this.#idCompra = idCompra;
    this.#idProducto = idProducto;
    this.#cantidad = cantidad;
    this.#precioUnitario = precioUnitario;
    this.#subtotal = subtotal;
  }

  getIdDetalleCompra() {
    return this.#idDetalleCompra;
  }

  setIdDetalleCompra(idDetalleCompra) {
    this.#idDetalleCompra = idDetalleCompra;
  }

  getIdCompra() {
    return this.#idCompra;
  }

  setIdCompra(idCompra) {
    this.#idCompra = idCompra;
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
      idDetalleCompra: this.#idDetalleCompra,
      idCompra: this.#idCompra,
      idProducto: this.#idProducto,
      cantidad: this.#cantidad,
      precioUnitario: this.#precioUnitario,
      subtotal: this.#subtotal
    };
  }
}

module.exports = DetallesCompra;