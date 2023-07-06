import useClima from '../hooks/useClima'
import Formulario from './Formulario'
import Spinner from './Spinner'
import Resultado from './Resultado'


const AppClima = () => {

   const {resultado, cargando, noResultado} = useClima()


   return (
      <main className="dos-columnas">
         <Formulario />

         {
            cargando ? <Spinner /> : 
            resultado?.name ? <Resultado/> : 
            noResultado ? <p>{noResultado}</p> 
            : <p>El clima se va mostrar aqui</p>
             
         } 
      </main>
   )
}

export default AppClima