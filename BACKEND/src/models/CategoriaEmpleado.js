class CategoriaEmpleado {
  #idCategoriaEmpleado;
  #nombre;
  #descripcion;
  #estado;

  constructor(idCategoriaEmpleado, nombre, descripcion, estado) {
    this.#idCategoriaEmpleado = idCategoriaEmpleado;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#estado = estado;
  }

  getIdCategoriaEmpleado() {
    return this.#idCategoriaEmpleado;
  }

  setIdCategoriaEmpleado(idCategoriaEmpleado) {
    this.#idCategoriaEmpleado = idCategoriaEmpleado;
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
      idCategoriaEmpleado: this.#idCategoriaEmpleado,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      estado: this.#estado
    };
  }
}

module.exports = CategoriaEmpleado;