const express = require('express');
const rutas = express.Router();
const controlador = require('../Controllers/controlador');

rutas

.get('/', controlador.inicio)
.post('/inicioSesion', controlador.obtenerDatos)
.post('/materias', controlador.materiasProfesor)
.post('/mesasInscriptos', controlador.mesasAlumnos)
.post('/profesorDatos' , controlador.profesorDatos)
.post('/profesorModificar', controlador.modificarProfesor);

module.exports = rutas;