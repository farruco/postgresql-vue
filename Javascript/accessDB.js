// Lo importa -server.js-.
// Establece la conexión y hace las consultas SQL.
const pgp = require('pg-promise')() // Biblioteca que interactua con la D.B.
const cn = (
  {
    user: 'github',
    host: '',
    database: '',
    password: 'github', // Si se necesita.
    port: 5432,
  }
)

const db = pgp(cn)

const consultarDb= function(db, seleccionar, res) {
  db.any(seleccionar)
    .then(response => {
      res.send(response)
  })
  .catch(error => {
    console.log('Error en Javascript/sql-connect.js -> consultarDb: ' + error.message)
  })
}
// Recupera todas las filas de la tabla.
const selectAllListasReproducion = 'SELECT nombre_lista "Lista", posicion "Posicion", titulo "Titulo" ' +
                                     'FROM datos.listas_reproducion ' +
                                     'ORDER BY nombre_lista, posicion;'

exports.selectAllListasReproducion = (req, res) => {
  consultarDb(db, selectAllListasReproducion, res)
}
// Recupera todas las filas de la tabla.
const selectAllNombresListas = 'SELECT nombre_lista "Lista" ' +
                                 'FROM datos.listas_reproducion ' +
                                 'GROUP BY nombre_lista;'

exports.selectAllNombresListas = (req, res) => {
  consultarDb(db, selectAllNombresListas, res)
}
