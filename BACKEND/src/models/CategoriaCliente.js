class CategoriaCliente {
  #idCategoriaCliente;
  #nombre;
  #descripcion;
  #estado;

  constructor(idCategoriaCliente, nombre, descripcion, estado) {
    this.#idCategoriaCliente = idCategoriaCliente;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#estado = estado;
  }

  getIdCategoriaCliente() {
    return this.#idCategoriaCliente;
  }

  setIdCategoriaCliente(idCategoriaCliente) {
    this.#idCategoriaCliente = idCategoriaCliente;
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

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idCategoriaCliente: this.#idCategoriaCliente,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      estado: this.#estado
    };
  }
}

module.exports = CategoriaCliente;