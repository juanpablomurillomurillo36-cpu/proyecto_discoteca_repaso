class Cliente {
  #idCliente;
  #idCategoriaCliente;
  #primerNombre;
  #segundoNombre;
  #primerApellido;
  #segundoApellido;
  #documento;
  #telefono;
  #email;
  #fechaNacimiento;
  #esVip;
  #estado;
  #puntosAcumulados;

  constructor(
    idCliente,
    idCategoriaCliente,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    documento,
    telefono,
    email,
    fechaNacimiento,
    esVip,
    estado,
    puntosAcumulados
  ) {
    this.#idCliente = idCliente;
    this.#idCategoriaCliente = idCategoriaCliente;
    this.#primerNombre = primerNombre;
    this.#segundoNombre = segundoNombre;
    this.#primerApellido = primerApellido;
    this.#segundoApellido = segundoApellido;
    this.#documento = documento;
    this.#telefono = telefono;
    this.#email = email;
    this.#fechaNacimiento = fechaNacimiento;
    this.#esVip = esVip;
    this.#estado = estado;
    this.#puntosAcumulados = puntosAcumulados;
  }

  getIdCliente() {
    return this.#idCliente;
  }

  setIdCliente(idCliente) {
    this.#idCliente = idCliente;
  }

  getIdCategoriaCliente() {
    return this.#idCategoriaCliente;
  }

  setIdCategoriaCliente(idCategoriaCliente) {
    this.#idCategoriaCliente = idCategoriaCliente;
  }

  getPrimerNombre() {
    return this.#primerNombre;
  }

  setPrimerNombre(primerNombre) {
    this.#primerNombre = primerNombre;
  }

  getSegundoNombre() {
    return this.#segundoNombre;
  }

  setSegundoNombre(segundoNombre) {
    this.#segundoNombre = segundoNombre;
  }

  getPrimerApellido() {
    return this.#primerApellido;
  }

  setPrimerApellido(primerApellido) {
    this.#primerApellido = primerApellido;
  }

  getSegundoApellido() {
    return this.#segundoApellido;
  }

  setSegundoApellido(segundoApellido) {
    this.#segundoApellido = segundoApellido;
  }

  getDocumento() {
    return this.#documento;
  }

  setDocumento(documento) {
    this.#documento = documento;
  }

  getTelefono() {
    return this.#telefono;
  }

  setTelefono(telefono) {
    this.#telefono = telefono;
  }

  getEmail() {
    return this.#email;
  }

  setEmail(email) {
    this.#email = email;
  }

  getFechaNacimiento() {
    return this.#fechaNacimiento;
  }

  setFechaNacimiento(fechaNacimiento) {
    this.#fechaNacimiento = fechaNacimiento;
  }

  getEsVip() {
    return this.#esVip;
  }

  setEsVip(esVip) {
    this.#esVip = esVip;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  getPuntosAcumulados() {
    return this.#puntosAcumulados;
  }

  setPuntosAcumulados(puntosAcumulados) {
    this.#puntosAcumulados = puntosAcumulados;
  }

  toJSON() {
    return {
      idCliente: this.#idCliente,
      idCategoriaCliente: this.#idCategoriaCliente,
      primerNombre: this.#primerNombre,
      segundoNombre: this.#segundoNombre,
      primerApellido: this.#primerApellido,
      segundoApellido: this.#segundoApellido,
      documento: this.#documento,
      telefono: this.#telefono,
      email: this.#email,
      fechaNacimiento: this.#fechaNacimiento,
      esVip: this.#esVip,
      estado: this.#estado,
      puntosAcumulados: this.#puntosAcumulados
    };
  }
}

module.exports = Cliente;