// Configuramos nuestro servidor
require ('dotenv').config()
const morgan = require('morgan')
const express = require ('express')
const bodyParser = require('body-parser')
const path = require ('path'); // Para concatenar ruta del index.html
const controlador = require('./Controllers/controlador');

const app = express();

// Configuraciones
app.set('port', process.env.PORT); // Asignamos un puerto disponible por defecto o puerto 3000.
const port = app.get('port');

// Middlewares (Servicios intermedios)
app.use(morgan("dev")); //Genera los status y tiempo de respuesta por consola cuando detecta eventos en la página.
app.use(express.json()); //Para interpretar el formato JSON automáticamente (Evitamos especificar el Content-Type="text/json").
app.use(bodyParser.urlencoded({ extended: false}))

// Rutas (URL´s)
app.get('/', controlador.inicio);
app.post('/inicioSesion', controlador.obtenerDatos);
app.get('/materias', controlador.materiasProfesor)

// Establecemos la carpeta estática para servir el archivo 'index.html'
app.use(express.static(path.join(__dirname)));

// Iniciamos el servidor
app.listen(port, ()=>{
    console.log('Server conectado en puerto ', port);
});

module.exports = app;