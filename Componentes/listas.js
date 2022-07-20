const { ref } = Vue
import { selectRows } from '../Javascript/fetch.js'

export default {
  setup() {
    const lista = ref('')
    const listas = ref([])
    const canciones = ref([])
    const parcial_canciones = ref([])
    const total_canciones = ref(0)
    return { lista, listas, canciones, parcial_canciones, total_canciones }
  },
  mounted() {
    const self = this
    selectRows(self, 'listas')       // Es la ruta establecida en -server.js-.
    selectRows(self, 'nombreListas') // Es la ruta establecida en -server.js-.
  },
  methods: {
    usarDatos(datos, ruta) { // Esta function se ejecuta en -Javascript/fetch-.
      if (ruta === "nombreListas") {
        this.listas = datos
        this.lista  = datos[0].Lista
      } else {
        this.canciones = datos
        this.total_canciones = this.canciones.filter(elemento => elemento.Lista == datos[0].Lista).length
        this.parcial_canciones = this.canciones.filter(elemento => elemento.Lista == datos[0].Lista)
      }
    },
    cambiar_lista: function(event) {
      this.parcial_canciones = this.canciones.filter(elemento => elemento.Lista == event.target.value)
      this.total_canciones = this.canciones.filter(elemento => elemento.Lista == event.target.value).length
      this.lista  = this.parcial_canciones[0].Lista
    }
  },
  template: `
    <main>
      <h3>Listas de Reproducción</h3>
      <h3>Total <span >{{ lista }}</span>: {{ total_canciones }}</h3>
      <select name="listas" v-on:change="cambiar_lista($event)" autofocus>
        <option v-for="lista in listas" :value="lista.Lista">
          {{ lista.Lista }}
        </option>
      </select>
      <table>
        <thead>
          <th>Lista</th>
          <th>Posición</th>
          <th>Título</th>
        </thead>
        <tbody>
          <tr v-for="cancion in parcial_canciones">
            <td>{{ cancion.Lista}}</td>
            <td>{{ cancion.Posicion}}</td>
            <td>{{ cancion.Titulo}}</td>
          </tr>
        </tbody>
      </table>
    </main> `
}
