const inicio = require ('./inicioAplicacion')
const obtenerDatos = require ('./inicioSesion')
const materiasProfesor = require ('./materias')
const mesasAlumnos = require('./mesasInscriptos')
const profesorDatos = require('./profesorDatos')
const modificarProfesor = require('./profesorModificar')

const controlador = {
    inicio, 
    obtenerDatos,
    materiasProfesor,
    mesasAlumnos,
    profesorDatos,
    modificarProfesor
}

module.exports = controlador