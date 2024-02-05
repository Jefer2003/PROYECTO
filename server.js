const express = require('express');
const bodyParser = require('body-parser');
const DataAccess = require('./src/dataAccess/DataAccess');
const BusinessLogic = require('./src/businessLogic/BusinessLogic');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

var dataAccess = new DataAccess();
var businessLogic = new BusinessLogic(dataAccess);

app.post('/api/registro', function(req, res) {
  businessLogic.handleRegistro(req.body)
    .then(result => {
      console.log('Usuario registrado'); // Agrega esta línea
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Ocurrió un error' });
    });
});

app.get('/api/registros', function(req, res) {
  dataAccess.getRegistros()
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Ocurrió un error' });
    });
});

app.delete('/api/registro/:id', function(req, res) {
  businessLogic.handleEliminar(req.params.id)
    .then(result => {
      console.log('Usuario eliminado');
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Ocurrió un error' });
    });
});

app.listen(3000, function() {
  console.log('Aplicación escuchando en el puerto 3000')
});
