class FichaTecnica {
  #idFichaTecnica;
  #idEvento;
  #tematica;
  #franjaHoraria;
  #cantidadInvitados;
  #observaciones;

  constructor(idFichaTecnica, idEvento, tematica, franjaHoraria, cantidadInvitados, observaciones) {
    this.#idFichaTecnica = idFichaTecnica;
    this.#idEvento = idEvento;
    this.#tematica = tematica;
    this.#franjaHoraria = franjaHoraria;
    this.#cantidadInvitados = cantidadInvitados;
    this.#observaciones = observaciones;
  }

  getIdFichaTecnica() {
    return this.#idFichaTecnica;
  }

  setIdFichaTecnica(idFichaTecnica) {
    this.#idFichaTecnica = idFichaTecnica;
  }

  getIdEvento() {
    return this.#idEvento;
  }

  setIdEvento(idEvento) {
    this.#idEvento = idEvento;
  }

  getTematica() {
    return this.#tematica;
  }

  setTematica(tematica) {
    this.#tematica = tematica;
  }

  getFranjaHoraria() {
    return this.#franjaHoraria;
  }

  setFranjaHoraria(franjaHoraria) {
    this.#franjaHoraria = franjaHoraria;
  }

  getCantidadInvitados() {
    return this.#cantidadInvitados;
  }

  setCantidadInvitados(cantidadInvitados) {
    this.#cantidadInvitados = cantidadInvitados;
  }

  getObservaciones() {
    return this.#observaciones;
  }

  setObservaciones(observaciones) {
    this.#observaciones = observaciones;
  }

  toJSON() {
    return {
      idFichaTecnica: this.#idFichaTecnica,
      idEvento: this.#idEvento,
      tematica: this.#tematica,
      franjaHoraria: this.#franjaHoraria,
      cantidadInvitados: this.#cantidadInvitados,
      observaciones: this.#observaciones
    };
  }
}

module.exports = FichaTecnica;