const conexion = require('../Database/conexion');

const materiasProfesor = async (req, res) => {
    // Verifica si el cuerpo de la solicitud tiene una propiedad 'profesorCodigo'
    const codigo = req.body.profesorCodigo;

    const querymateria = `SELECT c.Codigo AS Codigo_carrera,
            c.Nombre AS Nombre_carrera,
            m.Curso as Curso,
            m.Codigo AS Materia_codigo,
            m.Nombre AS Materia_nombre,
            d.Division as Division,
            d.Libre as Condicion,
            d.Ano as Año
        FROM 
            Personal p,
            Divisiones d,
            Materias m,
            Carreras c
        WHERE 
            m.Carrera = c.Codigo
            AND d.Materia = m.Codigo
            AND d.Profesor = p.Codigo
            AND p.Codigo = ${codigo}
            AND d.Ano = (Select AñoMatriculacion from Parametros)
        ORDER BY c.Nombre, m.Curso`;

    try {
        const data = await conexion.query(querymateria);

        if (data && data.length > 0) {
            res.json(data).status(200);
        } else {
            res.status(404).json({ error: "No se encontraron materias para el profesor" });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: "Error en la consulta", details: error.message });
    }
};

module.exports = materiasProfesor;
