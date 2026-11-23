class Acceso {
  #idAcceso;
  #idUsuario;
  #tipoAccion;
  #fechaHora;
  #ipOrigen;
  #resultado;

  constructor(
    idAcceso,
    idUsuario,
    tipoAccion,
    fechaHora,
    ipOrigen,
    resultado
  ) {
    this.#idAcceso = idAcceso;
    this.#idUsuario = idUsuario;
    this.#tipoAccion = tipoAccion;
    this.#fechaHora = fechaHora;
    this.#ipOrigen = ipOrigen;
    this.#resultado = resultado;
  }

  getIdAcceso() {
    return this.#idAcceso;
  }

  setIdAcceso(idAcceso) {
    this.#idAcceso = idAcceso;
  }

  getIdUsuario() {
    return this.#idUsuario;
  }

  setIdUsuario(idUsuario) {
    this.#idUsuario = idUsuario;
  }

  getTipoAccion() {
    return this.#tipoAccion;
  }

  setTipoAccion(tipoAccion) {
    this.#tipoAccion = tipoAccion;
  }

  getFechaHora() {
    return this.#fechaHora;
  }

  setFechaHora(fechaHora) {
    this.#fechaHora = fechaHora;
  }

  getIpOrigen() {
    return this.#ipOrigen;
  }

  setIpOrigen(ipOrigen) {
    this.#ipOrigen = ipOrigen;
  }

  getResultado() {
    return this.#resultado;
  }

  setResultado(resultado) {
    this.#resultado = resultado;
  }

  toJSON() {
    return {
      idAcceso: this.#idAcceso,
      idUsuario: this.#idUsuario,
      tipoAccion: this.#tipoAccion,
      fechaHora: this.#fechaHora,
      ipOrigen: this.#ipOrigen,
      resultado: this.#resultado
    };
  }
}

module.exports = Acceso;