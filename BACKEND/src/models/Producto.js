class Producto {
  #idProducto;
  #nombre;
  #descripcion;
  #precioVenta;
  #stockActual;
  #stockMinimo;
  #stockMaximo;
  #estado;

  constructor(idProducto, nombre, descripcion, precioVenta, stockActual, stockMinimo, stockMaximo, estado) {
    this.#idProducto = idProducto;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#precioVenta = precioVenta;
    this.#stockActual = stockActual;
    this.#stockMinimo = stockMinimo;
    this.#stockMaximo = stockMaximo;
    this.#estado = estado;
  }

  getIdProducto() {
    return this.#idProducto;
  }

  setIdProducto(idProducto) {
    this.#idProducto = idProducto;
  }

  getNombre() {
    return this.#nombre;
  }

  setNombre(nombre) {
    this.#nombre = nombre;
  }

  getDescripcion() {
    return this.#descripcion;
  }

  setDescripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  getPrecioVenta() {
    return this.#precioVenta;
  }

  setPrecioVenta(precioVenta) {
    this.#precioVenta = precioVenta;
  }

  getStockActual() {
    return this.#stockActual;
  }

  setStockActual(stockActual) {
    this.#stockActual = stockActual;
  }

  getStockMinimo() {
    return this.#stockMinimo;
  }

  setStockMinimo(stockMinimo) {
    this.#stockMinimo = stockMinimo;
  }

  getStockMaximo() {
    return this.#stockMaximo;
  }

  setStockMaximo(stockMaximo) {
    this.#stockMaximo = stockMaximo;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idProducto: this.#idProducto,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      precioVenta: this.#precioVenta,
      stockActual: this.#stockActual,
      stockMinimo: this.#stockMinimo,
      stockMaximo: this.#stockMaximo,
      estado: this.#estado
    };
  }
}

module.exports = Producto;