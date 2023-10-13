require('dotenv').config()
const adodb = require('node-adodb')
const DB = process.env.DATABASE
const connection = adodb.open(DB) // Reemplaza con la ruta real de tu archivo de base de datos de Access en el .env

connection
.query('SELECT * FROM Personal')
.then(data => {
  //console.log(data)
})
.catch(error => {
  console.error(error);
})