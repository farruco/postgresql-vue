// Lo importa -server.js-.
// Establece la conexión y hace las consultas SQL.
const { Pool } = require('pg') // Biblioteca que interactua con la D.B.
const pool = new Pool(
  {
    user: 'github',
    host: '',
    database: '',
    password: 'github', // Si se necesita.
    port: 5432,
  }
)

const consultarPool= function(pool, seleccionar, res) {
  pool.query(seleccionar)
    .then(response => {
      res.send(response.rows)
  })
  .catch(error => {
    console.log('Error en Javascript/sql-connect.js -> consultarPool: ' + error.message)
  })
}
// Recupera todas las filas de la tabla.
const selectAllListasReproducion = 'SELECT nombre_lista "Lista", posicion "Posicion", titulo "Titulo" ' +
                                     'FROM datos.listas_reproducion ' +
                                     'ORDER BY nombre_lista, posicion;'

exports.selectAllListasReproducion = (req, res) => {
  consultarPool(pool, selectAllListasReproducion, res)
}
// Recupera todas las filas de la tabla.
const selectAllNombresListas = 'SELECT nombre_lista "Lista" ' +
                                 'FROM datos.listas_reproducion ' +
                                 'GROUP BY nombre_lista;'

exports.selectAllNombresListas = (req, res) => {
  consultarPool(pool, selectAllNombresListas, res)
}
