// Configuramos nuestro servidor
require ('dotenv').config()
const morgan = require('morgan')
const express = require ('express')
const path = require ('path'); // Para concatenar ruta del index.html
const controlador = require('./controllers/controlador');
const cors = require('cors');

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);; // Asignamos un puerto disponible por defecto o puerto 3000.
const port = app.get('port');
app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con el dominio de tu cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));
  

// Middlewares (Servicios intermedios)
app.use(morgan("dev")); //Genera los status y tiempo de respuesta por consola cuando detecta eventos en la página.
app.use(express.json()); //Para interpretar el formato JSON automáticamente (Evitamos especificar el Content-Type="text/json").

// Rutas (URL´s)
app.get('/', controlador.inicio);
app.post('/inicioSesion', controlador.obtenerDatos );

// Establecemos la carpeta estática para servir el archivo 'index.html'
app.use(express.static(path.join(__dirname, 'src')));


// Iniciamos el servidor
app.listen(port, ()=>{
    console.log('Server conectado en puerto ', port);
});

module.exports = app;