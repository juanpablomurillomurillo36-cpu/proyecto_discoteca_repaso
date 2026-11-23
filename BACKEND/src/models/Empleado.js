class Empleado {
  #idEmpleado;
  #idCategoriaEmpleado;
  #primerNombre;
  #segundoNombre;
  #primerApellido;
  #segundoApellido;
  #documento;
  #telefono;
  #email;
  #estado;

  constructor(
    idEmpleado,
    idCategoriaEmpleado,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    documento,
    telefono,
    email,
    estado
  ) {
    this.#idEmpleado = idEmpleado;
    this.#idCategoriaEmpleado = idCategoriaEmpleado;
    this.#primerNombre = primerNombre;
    this.#segundoNombre = segundoNombre;
    this.#primerApellido = primerApellido;
    this.#segundoApellido = segundoApellido;
    this.#documento = documento;
    this.#telefono = telefono;
    this.#email = email;
    this.#estado = estado;
  }

  getIdEmpleado() {
    return this.#idEmpleado;
  }

  setIdEmpleado(idEmpleado) {
    this.#idEmpleado = idEmpleado;
  }

  getIdCategoriaEmpleado() {
    return this.#idCategoriaEmpleado;
  }

  setIdCategoriaEmpleado(idCategoriaEmpleado) {
    this.#idCategoriaEmpleado = idCategoriaEmpleado;
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

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  toJSON() {
    return {
      idEmpleado: this.#idEmpleado,
      idCategoriaEmpleado: this.#idCategoriaEmpleado,
      primerNombre: this.#primerNombre,
      segundoNombre: this.#segundoNombre,
      primerApellido: this.#primerApellido,
      segundoApellido: this.#segundoApellido,
      documento: this.#documento,
      telefono: this.#telefono,
      email: this.#email,
      estado: this.#estado
    };
  }
}

module.exports = Empleado;