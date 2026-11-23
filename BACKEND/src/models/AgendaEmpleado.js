class AgendaEmpleado {
  #idAgendaEmpleado;
  #idEmpleados;
  #idServicios;
  #idEvento;
  #fecha;
  #horaInicio;
  #horaFin;
  #estado;

  constructor(idAgendaEmpleado, idEmpleados, idServicios, idEvento, fecha, horaInicio, horaFin, estado) {
    this.#idAgendaEmpleado = idAgendaEmpleado;
    this.#idEmpleados = idEmpleados;
    this.#idServicios = idServicios;
    this.#idEvento = idEvento;
    this.#fecha = fecha;
    this.#horaInicio = horaInicio;
    this.#horaFin = horaFin;
    this.#estado = estado;
  }

  getIdAgendaEmpleado() {
    return this.#idAgendaEmpleado;
  }

  setIdAgendaEmpleado(idAgendaEmpleado) {
    this.#idAgendaEmpleado = idAgendaEmpleado;
  }

  getIdEmpleados() {
    return this.#idEmpleados;
  }

  setIdEmpleados(idEmpleados) {
    this.#idEmpleados = idEmpleados;
  }

  getIdServicios() {
    return this.#idServicios;
  }

  setIdServicios(idServicios) {
    this.#idServicios = idServicios;
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
      idAgendaEmpleado: this.#idAgendaEmpleado,
      idEmpleados: this.#idEmpleados,
      idServicios: this.#idServicios,
      idEvento: this.#idEvento,
      fecha: this.#fecha,
      horaInicio: this.#horaInicio,
      horaFin: this.#horaFin,
      estado: this.#estado
    };
  }
}

module.exports = AgendaEmpleado;