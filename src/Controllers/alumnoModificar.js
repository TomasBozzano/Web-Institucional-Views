const conexion = require('../Database/conexion');

const modificarAlumnos = async (req, res) => {

        const datosAlumnos = req.body.alumnosDatos;

        if (!datosAlumnos || Object.keys(datosAlumnos).length === 0) {
          return res.status(400).json({ error: 'Datos de alumnos no válidos' });
        }
    
        // Iterar sobre cada alumno y ejecutar la consulta de actualización
        for (const permiso in datosAlumnos) {
          const { Datos } = datosAlumnos[permiso];
          const { Parcial1, Parcial2, Totalizador, Recuperatorio1, Recuperatorio2, Practico1, Practico2, Practico3, Practico4, Practico5, Cursada, Asistencia, codigoMateria } = Datos;
    
          // Consulta SQL para actualizar los datos del alumno
          const query = `
            UPDATE Finales 
            SET 
              Parcial1 = ${Parcial1}, 
              Parcial2 = ${Parcial2}, 
              Totalizador = ${Totalizador}, 
              Recuperatorio1 = ${Recuperatorio1}, 
              Recuperatorio2 = ${Recuperatorio2}, 
              Practico1 = ${Practico1}, 
              Practico2 = ${Practico2}, 
              Practico3 = ${Practico3}, 
              Practico4 = ${Practico4}, 
              Practico5 = ${Practico5}, 
              Cursada = ${Cursada}, 
              Asistencia = ${Asistencia}
            WHERE Permiso = ${permiso}
            AND Ano = (Select AñoMatriculacion from Parametros)
            AND Materia = ${codigoMateria}`;
    
        conexion
        .query(query)
        .then((data) =>{
            if(data && data.length > 0){
                res.status(200).json({ mensaje: 'Datos actualizados exitosamente' });
            }else{
                res.status(404).json({ mensaje: 'No se encontraron datos' })
            }
        })
        .catch ((error) => {
        console.error(error);
        console.log(query)
        res.status(500).json({ error: 'Error en la consulta', details: error.message });
        });
    }
}

module.exports = modificarAlumnos;