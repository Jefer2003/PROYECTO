document.getElementById('registro').addEventListener('submit', function(e) {
  e.preventDefault();

  var datos = {
    nombre: document.getElementById('nombre').value,
    moto: document.getElementById('moto').value,
    fecha: document.getElementById('fecha').value,
    kilometraje: document.getElementById('kilometraje').value
  };

  fetch('/api/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById('nombre').value = '';
    document.getElementById('moto').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('kilometraje').value = '';
    document.getElementById('mensaje').style.display = 'block';
    document.getElementById('mensaje').innerText = 'Usuario registrado';
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

document.getElementById('mostrarRegistros').addEventListener('click', function() {
  document.getElementById('registro').style.display = 'none';
  document.getElementById('mostrarRegistros').style.display = 'none';
  document.getElementById('registrar').style.display = 'block';
  cargarRegistros();
});

document.getElementById('registrar').addEventListener('click', function() {
  document.getElementById('tablaRegistros').style.display = 'none';
  document.getElementById('registrar').style.display = 'none';
  document.getElementById('registro').style.display = 'block';
  document.getElementById('mostrarRegistros').style.display = 'block';
  document.getElementById('mensaje').style.display = 'none';
});

function eliminarRegistro(id) {
  fetch('/api/registro/' + id, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    cargarRegistros();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function cargarRegistros() {
  fetch('/api/registros')
    .then(response => response.json())
    .then(data => {
      var tabla = document.getElementById('tablaRegistros');
      tabla.style.display = 'block';
      while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
      }
      data.forEach(registro => {
        var fila = tabla.insertRow(-1);
        fila.insertCell(0).innerHTML = registro.nombre;
        fila.insertCell(1).innerHTML = registro.moto;
        fila.insertCell(2).innerHTML = registro.fecha;
        fila.insertCell(3).innerHTML = registro.kilometraje;
        var celdaEliminar = fila.insertCell(4);
        var botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
          eliminarRegistro(registro.id);
        });
        celdaEliminar.appendChild(botonEliminar);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
