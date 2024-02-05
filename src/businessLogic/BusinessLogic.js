class BusinessLogic {
  constructor(dataAccess) {
    this.dataAccess = dataAccess;
  }

  handleRegistro(registro) {
    // Aquí puedes agregar cualquier lógica de negocio necesaria
    return this.dataAccess.insertRegistro(registro);
  }
  handleEliminar(id) {
    // Aquí puedes agregar cualquier lógica de negocio necesaria
    return this.dataAccess.deleteRegistro(id);
  }
}

module.exports = BusinessLogic;
