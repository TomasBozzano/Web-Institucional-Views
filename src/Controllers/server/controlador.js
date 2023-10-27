const inicio = require ('./inicioAplicacion')
const obtenerDatos = require('../inicioSesion');  // Asegúrate de proporcionar la ruta correcta

const controlador = {
    inicio, 
    obtenerDatos,
}

module.exports = controlador;