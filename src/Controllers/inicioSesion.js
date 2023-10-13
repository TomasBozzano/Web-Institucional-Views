const conexion = require('../Database/conexion');

const obtenerDatos = (req, res) => {
    const form = document.querySelector('form')
    .addEventListener('submit', e => {
    e.preventDefault() //Evitamos el comportamiento por defecto
    const dni = document.querySelector('#dni').value;
    const clave = document.querySelector('#clave').value;
    const object = {
            dni,
            clave
        }
    alert(dni, clave)
    })
};
  
module.exports = obtenerDatos; 