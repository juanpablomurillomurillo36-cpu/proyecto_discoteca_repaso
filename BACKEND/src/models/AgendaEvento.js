class AgendaEvento {
  #idAgendaEvento;
  #idEvento;
  #fecha;
  #hora;
  #descripcion;
  #estado;

  constructor(idAgendaEvento, idEvento, fecha, hora, descripcion, estado) {
    this.#idAgendaEvento = idAgendaEvento;
    this.#idEvento = idEvento;
    this.#fecha = fecha;
    this.#hora = hora;
    this.#descripcion = descripcion;
    this.#estado = estado;
  }

  getIdAgendaEvento() {
    return this.#idAgendaEvento;
  }

  setIdAgendaEvento(idAgendaEvento) {
    this.#idAgendaEvento = idAgendaEvento;
  }

  getIdEvento() {
    return this.#idEvento;
  }

  setIdEvento(idEvento) {
    this.#idEvento = idEvento;
  }

  getFecha() {
    return this.#fecha;
  }

  setFecha(fecha) {
    this.#fecha = fecha;
  }

  getHora() {
    return this.#hora;
  }

  setHora(hora) {
    this.#hora = hora;
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
      idAgendaEvento: this.#idAgendaEvento,
      idEvento: this.#idEvento,
      fecha: this.#fecha,
      hora: this.#hora,
      descripcion: this.#descripcion,
      estado: this.#estado
    };
  }
}

module.exports = AgendaEvento;