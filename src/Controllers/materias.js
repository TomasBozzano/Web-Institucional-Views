const conexion = require('../Database/conexion');

const materiasProfesor = (req, res) => {
    const query = 'SELECT Carreras.Codigo AS Codigo_carrera, Carreras.Nombre AS Nombre_carrera, Materias.Curso, Materias.Codigo AS Materia_codigo, Materias.Nombre AS Materia_nombre, Divisiones.Division, Divisiones.Libre, Divisiones.Ano FROM ((Divisiones INNER JOIN Personal ON Divisiones.Profesor = Personal.Codigo) INNER JOIN Materias ON Divisiones.Materia = Materias.Codigo) INNER JOIN Carreras ON Materias.Carrera = Carreras.Codigo WHERE (((Divisiones.Ano)=SELECT AñoMatriculacion, TurnoLlamado, AñoLlamado, NombreInstitucion FROM Parametros) AND ((Personal.Codigo)=9999)) ORDER BY Carreras.Nombre, Materias.Curso';
    const materias = document.getElementById('#materias_profesor')
    materias.addEventListener("click", e =>{
        e.defaultPrevented()
        conexion.connection
        .query(query)
        .then(data =>{
            if(data && data.length > 0){
                res.sendFile(__dirname + '/html/materias.html');
            }
        })
        .catch((error) => {
            res.status(500).json(({ error: "Error en la consulta" }));
          });
    })
};

module.exports = materiasProfesor;