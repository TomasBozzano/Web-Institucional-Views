const conexion = require('../Database/conexion');

const modificarProfesor = async (req, res) => {
  try {
    // Verificar si la conexión está abierta, de lo contrario, abrir la conexión
    if (!conexion) {
      await conexion.connect();
    }

    const { codigo, nombre, documento, postal, domicilio, telefono, localidad } = req.body;

    // Consulta SQL para actualizar los datos del profesor
    const query = `UPDATE Personal SET Nombre = '${nombre}', Postal = '${postal}', Domicilio = '${domicilio}', Telefono = '${telefono}', Localidad = '${localidad}' WHERE Codigo = ${codigo} AND Documento = '${documento}'`;

    // Ejecutar la consulta
    const result = await conexion.query(query);

    if (result && result.affectedRows > 0) {
      res.status(200).json({ mensaje: 'Datos actualizados exitosamente' });
    } else {
      res.status(404).json({ error: 'No se encontraron datos para actualizar' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en la consulta', details: error.message });
  }
};

module.exports = modificarProfesor;
