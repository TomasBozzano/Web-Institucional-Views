require('dotenv').config();
const adodb = require('node-adodb');
const DB = process.env.DATABASE;

const connection = adodb.open(DB);

connection
  .query('SELECT * FROM Personal')
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos:', error);
  });

module.exports = {
  connection,
};
