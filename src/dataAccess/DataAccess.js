var sqlite3 = require('sqlite3').verbose();

class DataAccess {
  constructor() {
    this.db = new sqlite3.Database('./motos.db');

    // Crear la tabla registros si no existe
    this.db.run(`CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY,
      nombre TEXT,
      moto TEXT,
      fecha TEXT,
      kilometraje INTEGER
    )`);
  }

  insertRegistro(registro) {
    return new Promise((resolve, reject) => {
      this.db.run("INSERT INTO registros (nombre, moto, fecha, kilometraje) VALUES (?, ?, ?, ?)", [registro.nombre, registro.moto, registro.fecha, registro.kilometraje], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  getRegistros() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM registros", function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  deleteRegistro(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM registros WHERE id = ?", [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: id });
        }
      });
    });
  }
}

module.exports = DataAccess;
