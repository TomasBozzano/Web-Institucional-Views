require('dotenv').config();
const adodb = require('node-adodb');
const DB = process.env.DATABASE;

const connection = adodb.open(DB);

try{
  if(connection){
  }
}catch(error){
  console.log('Error en la conexión a la base de datos:', error)
}

module.exports = connection;
