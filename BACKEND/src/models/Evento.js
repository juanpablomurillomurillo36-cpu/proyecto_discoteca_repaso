class Evento {
  #idEvento;
  #nombre;
  #tematica;
  #fecha;
  #horaInicio;
  #horaFin;
  #estado;

  constructor(idEvento, nombre, tematica, fecha, horaInicio, horaFin, estado) {
    this.#idEvento = idEvento;
    this.#nombre = nombre;
    this.#tematica = tematica;
    this.#fecha = fecha;
    this.#horaInicio = horaInicio;
    this.#horaFin = horaFin;
    this.#estado = estado;
  }

  getIdEvento() {
    return this.#idEvento;
  }

  setIdEvento(idEvento) {
    this.#idEvento = idEvento;
  }

  getNombre() {
    return this.#nombre;
  }

  setNombre(nombre) {
    this.#nombre = nombre;
  }

  getTematica() {
    return this.#tematica;
  }

  setTematica(tematica) {
    this.#tematica = tematica;
  }

  getFecha() {
    return this.#fecha;
  }

  setFecha(fecha) {
    this.#fecha = fecha;
  }

  getHoraInicio() {
    return this.#horaInicio;
  }

  setHoraInicio(horaInicio) {
    this.#horaInicio = horaInicio;
  }

  getHoraFin() {
    return this.#horaFin;
  }

  setHoraFin(horaFin) {
    this.#horaFin = horaFin;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idEvento: this.#idEvento,
      nombre: this.#nombre,
      tematica: this.#tematica,
      fecha: this.#fecha,
      horaInicio: this.#horaInicio,
      horaFin: this.#horaFin,
      estado: this.#estado
    };
  }
}

module.exports = Evento;