const conexion = require('../Database/conexion');

const finalesAlumno = (req, res) => {
    try {
        const mesa = req.body.mesa;

        const queryFinal = ` SELECT a.Permiso, 
                                a.Nombre, 
                                a.Documento,
                                i.Cursada as Cursada
                            FROM Inscripciones i, 
                            Alumnos a,
                            Mesas m,
                            Finales f
                            WHERE i.FechaBorrado IS NULL
                            AND i.Mesa = ${mesa}
                            AND f.Cursada = TRUE
                            AND i.Alumno = a.Permiso 
                            AND i.Mesa = m.Numero
                            AND m.Materia = f.Materia
                            AND a.Permiso = f.Alumno
                            AND m.Turno = (SELECT TurnoLlamado FROM Parametros)
                            AND m.Ano = (SELECT AñoLlamado FROM Parametros)
                            ORDER BY a.Nombre`;

        conexion.query(queryFinal)
            .then((data) => {
                if (data && data.length > 0) {
                    res.json(data).status(200);
                } else {
                    res.status(404).json({ error: "No se encontraron alumnos disponibles" });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error en la consulta" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = finalesAlumno;
