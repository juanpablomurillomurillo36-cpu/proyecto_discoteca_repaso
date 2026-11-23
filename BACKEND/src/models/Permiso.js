class Permiso {
  #idPermiso;
  #nombrePermiso;
  #descripcion;
  #estado;

  constructor(idPermiso, nombrePermiso, descripcion, estado) {
    this.#idPermiso = idPermiso;
    this.#nombrePermiso = nombrePermiso;
    this.#descripcion = descripcion;
    this.#estado = estado;
  }

  getIdPermiso() {
    return this.#idPermiso;
  }

  setIdPermiso(idPermiso) {
    this.#idPermiso = idPermiso;
  }

  getNombrePermiso() {
    return this.#nombrePermiso;
  }

  setNombrePermiso(nombrePermiso) {
    this.#nombrePermiso = nombrePermiso;
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
      idPermiso: this.#idPermiso,
      nombrePermiso: this.#nombrePermiso,
      descripcion: this.#descripcion,
      estado: this.#estado
    };
  }
}

module.exports = Permiso;