const conexion = require('../Database/conexion');

const obtenerDatos = (req, res) => {
  const dni = req.body.dni;
  const clave = req.body.clave;
  //console.log(dni , clave)

  if (!dni || !clave) {
    return res.status(400).json({ error: "Por favor, ingrese sus datos correctamente" });
  }

  const query = `SELECT Documento, Contrasena, Nombre, Codigo, Usuario FROM Personal WHERE Usuario='${dni}' AND Contrasena='${clave}'`;

  //console.log(query);

  conexion.connection
    .query(query)
    .then(data => {
      if ((data && data.length > 0)) {
        res.sendFile(__dirname + '/html/home.html');
      } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la consulta" });
    });
};

module.exports = obtenerDatos;
  