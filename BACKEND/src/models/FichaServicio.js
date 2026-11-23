class FichaServicio {
  #idFichaTecnica;
  #idServicio;
  #cantidadRequerida;

  constructor(idFichaTecnica, idServicio, cantidadRequerida) {
    this.#idFichaTecnica = idFichaTecnica;
    this.#idServicio = idServicio;
    this.#cantidadRequerida = cantidadRequerida;
  }

  getIdFichaTecnica() {
    return this.#idFichaTecnica;
  }

  setIdFichaTecnica(idFichaTecnica) {
    this.#idFichaTecnica = idFichaTecnica;
  }

  getIdServicio() {
    return this.#idServicio;
  }

  setIdServicio(idServicio) {
    this.#idServicio = idServicio;
  }

  getCantidadRequerida() {
    return this.#cantidadRequerida;
  }

  setCantidadRequerida(cantidadRequerida) {
    this.#cantidadRequerida = cantidadRequerida;
  }

  toJSON() {
    return {
      idFichaTecnica: this.#idFichaTecnica,
      idServicio: this.#idServicio,
      cantidadRequerida: this.#cantidadRequerida
    };
  }
}

module.exports = FichaServicio;