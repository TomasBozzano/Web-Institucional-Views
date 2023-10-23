const inicio = require ('./inicioAplicacion')
const obtenerDatos = require ('./inicioSesion')
const materiasProfesor = require ('./materias')

const controlador = {
    inicio, 
    obtenerDatos,
    materiasProfesor,
}

module.exports = controlador