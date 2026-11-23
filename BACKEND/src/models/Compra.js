class Compra {
  #idCompra;
  #idProveedor;
  #fechaCompra;
  #total;
  #estado;

  constructor(idCompra, idProveedor, fechaCompra, total, estado) {
    this.#idCompra = idCompra;
    this.#idProveedor = idProveedor;
    this.#fechaCompra = fechaCompra;
    this.#total = total;
    this.#estado = estado;
  }

  getIdCompra() {
    return this.#idCompra;
  }

  setIdCompra(idCompra) {
    this.#idCompra = idCompra;
  }

  getIdProveedor() {
    return this.#idProveedor;
  }

  setIdProveedor(idProveedor) {
    this.#idProveedor = idProveedor;
  }

  getFechaCompra() {
    return this.#fechaCompra;
  }

  setFechaCompra(fechaCompra) {
    this.#fechaCompra = fechaCompra;
  }

  getTotal() {
    return this.#total;
  }

  setTotal(total) {
    this.#total = total;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idCompra: this.#idCompra,
      idProveedor: this.#idProveedor,
      fechaCompra: this.#fechaCompra,
      total: this.#total,
      estado: this.#estado
    };
  }
}

module.exports = Compra;