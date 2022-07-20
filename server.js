// Arranca el servidor.
// Por defecto accede al archivo -index.html-.
const express    = require("express")
const accessDB   = require("./Javascript/accessDB.js")

const app = express()

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(express.static(__dirname))

const metodoRutaFuncion = [
  {
    metodo: "get",
    ruta: "/listas",
    funcion: accessDB.selectAllListasReproducion
  },
  {
    metodo: "get",
    ruta: "/nombreListas",
    funcion: accessDB.selectAllNombresListas
  }
]

for (const {metodo: metodo, ruta: ruta, funcion: funcion} of metodoRutaFuncion) {
  app[metodo](ruta, funcion)
}
// Use a port value of 0 to have the operating system assign an available port.
const server = app.listen(0, '127.0.0.1', function() {
  const port = server.address().port
  const host = server.address().address
  console.log('app listening at http://%s:%s/', host, port)
})
