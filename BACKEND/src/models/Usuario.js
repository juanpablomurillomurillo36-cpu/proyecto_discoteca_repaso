class Usuario {
  #idUsuario;
  #idRol;
  #primerNombre;
  #segundoNombre;
  #primerApellido;
  #segundoApellido;
  #email;
  #contrasenaHash;
  #telefono;
  #estado;
  #fechaCreacion;

  constructor(
    idUsuario,
    idRol,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    email,
    contrasenaHash,
    telefono,
    estado,
    fechaCreacion
  ) {
    this.#idUsuario = idUsuario;
    this.#idRol = idRol;
    this.#primerNombre = primerNombre;
    this.#segundoNombre = segundoNombre;
    this.#primerApellido = primerApellido;
    this.#segundoApellido = segundoApellido;
    this.#email = email;
    this.#contrasenaHash = contrasenaHash;
    this.#telefono = telefono;
    this.#estado = estado;
    this.#fechaCreacion = fechaCreacion;
  }

  getIdUsuario() {
    return this.#idUsuario;
  }

  setIdUsuario(idUsuario) {
    this.#idUsuario = idUsuario;
  }

  getIdRol() {
    return this.#idRol;
  }

  setIdRol(idRol) {
    this.#idRol = idRol;
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

  getEmail() {
    return this.#email;
  }

  setEmail(email) {
    this.#email = email;
  }

  getContrasenaHash() {
    return this.#contrasenaHash;
  }

  setContrasenaHash(contrasenaHash) {
    this.#contrasenaHash = contrasenaHash;
  }

  getTelefono() {
    return this.#telefono;
  }

  setTelefono(telefono) {
    this.#telefono = telefono;
  }

  getEstado() {
    return this.#estado;
  }

  setEstado(estado) {
    this.#estado = estado;
  }

  getFechaCreacion() {
    return this.#fechaCreacion;
  }

  setFechaCreacion(fechaCreacion) {
    this.#fechaCreacion = fechaCreacion;
  }

  toJSON() {
    return {
      idUsuario: this.#idUsuario,
      idRol: this.#idRol,
      primerNombre: this.#primerNombre,
      segundoNombre: this.#segundoNombre,
      primerApellido: this.#primerApellido,
      segundoApellido: this.#segundoApellido,
      email: this.#email,
      telefono: this.#telefono,
      estado: this.#estado,
      fechaCreacion: this.#fechaCreacion
    };
  }
}

module.exports = Usuario;