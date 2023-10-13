const conexion = require('../Database/conexion');

const obtenerDatos = (req, res) => {
  const dni = req.body.dni;
  const clave = req.body.clave;
  console.log(dni , clave)

  if (!dni || !clave) {
    return res.status(400).json({ error: "Por favor, ingrese sus datos correctamente" });
  }

  const query = `SELECT Documento, Contrasena, Nombre, Codigo, Usuario FROM Personal WHERE Usuario='${dni}' AND Contrasena='${clave}'`;

  console.log(query);

  conexion.connection
    .query(query)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(401).send('Credenciales incorrectas');
      }
    })
    .catch((error) => {
      res.status(500).send('Error en la consulta');
    });
};

module.exports = obtenerDatos;
  