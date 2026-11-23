class Servicio {
  #idServicio;
  #nombre;
  #descripcion;
  #precio;
  #estado;

  constructor(idServicio, nombre, descripcion, precio, estado) {
    this.#idServicio = idServicio;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#precio = precio;
    this.#estado = estado;
  }

  getIdServicio() {
    return this.#idServicio;
  }

  setIdServicio(idServicio) {
    this.#idServicio = idServicio;
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

  getPrecio() {
    return this.#precio;
  }

  setPrecio(precio) {
    this.#precio = precio;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idServicio: this.#idServicio,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      precio: this.#precio,
      estado: this.#estado
    };
  }
}

module.exports = Servicio;