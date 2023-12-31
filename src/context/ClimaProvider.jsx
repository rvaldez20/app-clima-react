import { useState, createContext } from 'react'
import axios from 'axios'

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {
   //!----- logic provider ----

   //* States
   const [busqueda, setBusqueda] = useState({
     ciudad: '',
     pais: '', 
   })
   const [resultado, setResultado] = useState({})
   const [cargando, setCargando] = useState(false)
   const [noResultado, setNoResultado] = useState('')

   //* Functions
   const datosBusqueda = e => {
      setBusqueda({
         ...busqueda,
         [e.target.name]: e.target.value
      })
   }

   // llamada a la API del clima
   const consultarClima = async datos => {
      // console.log(datos)
      // import.meta.env.VITE_API_KEY

      setCargando(true)
      setNoResultado(false)

      try {
         
         const {ciudad, pais} = datos
         const appId = import.meta.env.VITE_API_KEY

         //! llamamos la API para obtener la latitud y longitud
         const urlGetGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`       
         const {data} = await axios(urlGetGeocoding)
         // console.log(data[0])
         const {lat, lon} = data[0]

          //! volvemos a llamar a la API para obtener el clima usando la latitud y longitud
         // volvemos a llamar la API para consultar el clicma usando la latitud y longitud
         const urlGetClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
         // console.log(urlGetClima)
         const {data: clima} = await axios(urlGetClima)
         console.log(clima)

         // guardamos la respuesta en el state
         setResultado(clima)

      } catch (error) {
         setNoResultado('No hay resultados')
      } finally {
         // se finaliza el llamado de la api deshabilitamso cargando
         setCargando(false)
      }
   }

   return (
      <ClimaContext.Provider
         value={{
            busqueda,
            datosBusqueda,
            consultarClima,
            resultado,
            cargando,
            noResultado,
         }}
      >
         { children }
      </ClimaContext.Provider>
   )
}

export { ClimaProvider }
export default ClimaContext