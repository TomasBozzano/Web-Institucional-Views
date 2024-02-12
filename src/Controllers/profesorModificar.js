const conexion = require('../Database/conexion');

const modificarProfesor = async (req, res) => {
  
  const {
    codigo,
    nombre,
    documento,
    postal,
    domicilio,
    telefono,
    localidad
  } = req.body

  // Consulta SQL para actualizar los datos del profesor
  const query = `UPDATE Personal SET Nombre = '${nombre}', Postal = '${postal}', Domicilio = '${domicilio}', Telefono = '${telefono}', Localidad = '${localidad}' WHERE Codigo = ${codigo} AND Documento='${documento}'`;

 conexion
 .query(query)
 .then(data => {
  if (data && data.length > 0) {
    console.log(data)
    res.status(200).json({ mensaje: 'Datos actualizados exitosamente' });
  } else {
    res.status(404).json({ error: 'No se encontraron datos para actualizar' });
  }
 })
 .catch((error) => {
  res.status(500).json({ error: 'Error en la consulta', details: error.message });
  });
}

module.exports = modificarProfesor;
