const conexion = require('../../Database/conexion');

const materiasProfesor = (req, res) => {
  // Consulta SQL para obtener las materias del profesor
  const query = `SELECT Carreras.Codigo AS Codigo_carrera, Carreras.Nombre AS Nombre_carrera, Materias.Curso, Materias.Codigo AS Materia_codigo, Materias.Nombre AS Materia_nombre, Divisiones.Division, Divisiones.Libre, Divisiones.Ano FROM ((Divisiones INNER JOIN Personal ON Divisiones.Profesor = Personal.Codigo) INNER JOIN Materias ON Divisiones.Materia = Materias.Codigo) INNER JOIN Carreras ON Materias.Carrera = Carreras.Codigo WHERE (((Divisiones.Ano)=(SELECT AñoMatriculacion FROM Parametros)) AND ((Personal.Codigo)='{usuario}')) ORDER BY Carreras.Nombre, Materias.Curso`;
  // Ejecutar la consulta en la base de datos
  conexion.connection
    .query(query)
    .then((data) => {
      if (data && data.length > 0) {
        res.json(data);
      } else {
        // Si no se encontraron resultados
        res.status(404).json({ error: "No se encontraron materias para el profesor" });
      }
    })
    .catch((error) => {
      // Manejo de errores
      console.error(error);
      res.status(500).json({ error: "Error en la consulta" });
    });
};
