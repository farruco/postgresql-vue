// https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
// La API Fetch proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP,
// tales como peticiones y respuestas. También provee un método global fetch() (en-US) que proporciona una
// forma fácil y lógica de obtener recursos de forma asíncrona por la red.

// Lo importa el componente -Componentes/listas.js-.
// La -ruta- viene de: server.js -> Componentes/listas.js
export function selectRows(self, ruta) {
  fetch(ruta)
  .then(function(response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status)
    }
    return response.json()
  })
  .then(json => {
    self.usarDatos(json, ruta) // Esta function se crea en el componente que llama a -fetch-.
  })
  .catch(function(error) {
      console.log('Error en Javascript/fetch.js -> selectRows: ' + error.message)
  })
}
