const conexion = require('../Database/conexion');

const modificarAlumnos = async (req, res) => {
    const datosAlumnos = req.body.alumnosDatos;

    if (!datosAlumnos || Object.keys(datosAlumnos).length === 0) {
        return res.status(400).json({ error: 'Datos de alumnos no válidos' });
    }

    // Arreglo para almacenar promesas de consultas SQL
    const consultas = [];

    // Iterar sobre cada alumno y agregar la consulta SQL al arreglo de promesas
    for (const permiso in datosAlumnos) {
        const { Datos } = datosAlumnos[permiso];
        const { Parcial1, Parcial2, Totalizador, Recuperatorio1, Recuperatorio2, Practico1, Practico2, Practico3, Practico4, Practico5, Cursada, Asistencia, codigoMateria } = Datos;

        const query = `
            UPDATE Finales
            SET 
                f.Parcial1 = ${Parcial1}, 
                f.Parcial2 = ${Parcial2}, 
                f.Totalizador = ${Totalizador}, 
                f.Recuperatorio1 = ${Recuperatorio1}, 
                f.Recuperatorio2 = ${Recuperatorio2}, 
                f.Practico1 = ${Practico1}, 
                f.Practico2 = ${Practico2}, 
                f.Practico3 = ${Practico3}, 
                f.Practico4 = ${Practico4}, 
                f.Practico5 = ${Practico5}, 
                f.Cursada = ${Cursada}, 
                f.Asistencia = ${Asistencia}
            FROM Finales f,
            Alumnos a,
            Materias m
            WHERE f.Alumnno = ${permiso}
            AND f.Alumno = a.Permiso
            AND f.Materia = m.Codigo
            AND f.Ano = (Select AñoMatriculacion from Parametros)
            AND f.Materia = ${codigoMateria}`;

        // Agregar la consulta al arreglo de promesas
        consultas.push(conexion.query(query));
    }

    // Ejecutar todas las consultas en paralelo
    Promise.all(consultas)
        .then(() => {
            res.status(200).json({ mensaje: 'Datos actualizados exitosamente' });
        })
        .catch((error) => {
            console.error(query);
            res.status(500).json({ error: 'Error en la consulta', details: error.message });
        });
};

module.exports = modificarAlumnos;
