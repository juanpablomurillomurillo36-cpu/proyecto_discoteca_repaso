class Rol {
  #idRol;
  #nombreRol;
  #descripcion;
  #estado;
  #fechaCreacion;

  constructor(idRol, nombreRol, descripcion, estado, fechaCreacion) {
    this.#idRol = idRol;
    this.#nombreRol = nombreRol;
    this.#descripcion = descripcion;
    this.#estado = estado;
    this.#fechaCreacion = fechaCreacion;
  }

  getIdRol() {
    return this.#idRol;
  }

  setIdRol(idRol) {
    this.#idRol = idRol;
  }

  getNombreRol() {
    return this.#nombreRol;
  }

  setNombreRol(nombreRol) {
    this.#nombreRol = nombreRol;
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

  getFechaCreacion() {
    return this.#fechaCreacion;
  }

  setFechaCreacion(fechaCreacion) {
    this.#fechaCreacion = fechaCreacion;
  }

  toJSON() {
    return {
      idRol: this.#idRol,
      nombreRol: this.#nombreRol,
      descripcion: this.#descripcion,
      estado: this.#estado,
      fechaCreacion: this.#fechaCreacion
    };
  }
}

module.exports = Rol;