import { useState, createContext } from 'react'

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {
   //!----- logic provider ----

   //* States
   const [busqueda, setBusqueda] = useState({
     ciudad: '',
     pais: '', 
   })

   //* Functions
   const datosBusqueda = e => {
      setBusqueda({
         ...busqueda,
         [e.target.name]: e.target.value
      })
   }

   const consultarClima = datos => {
      console.log(datos)
   }

   return (
      <ClimaContext.Provider
         value={{
            busqueda,
            datosBusqueda,
            consultarClima,
         }}
      >
         { children }
      </ClimaContext.Provider>
   )
}

export { ClimaProvider }
export default ClimaContext