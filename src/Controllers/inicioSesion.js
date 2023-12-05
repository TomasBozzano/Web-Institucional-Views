const conexion = require('../database/conexion');

const obtenerDatos = (req, res) => {
  const dni = req.body.dni; // Accede al DNI a través de req.query en una solicitud GET
  const clave = req.body.clave; // Accede a la clave a través de req.query en una solicitud GET

  if (!dni || !clave) {
    return res.status(400).json({ error: "Por favor, ingrese sus datos correctamente" });
  }

  const query = `SELECT Documento, Contrasena, Nombre, Codigo, Usuario FROM Personal WHERE Usuario='${dni}' AND Contrasena='${clave}'`;

  conexion.connection
    .query(query)
    .then(data => {
      if (data && data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "Error en la consulta" });
    });
};

module.exports = obtenerDatos;

  