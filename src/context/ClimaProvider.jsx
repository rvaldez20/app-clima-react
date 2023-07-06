import { useState, createContext } from 'react'

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {
   // logic provider


   return (
      <ClimaContext.Provider
         value={{
         
         }}
      >
         { children }
      </ClimaContext.Provider>
   )
}

export { ClimaProvider }
export default ClimaContext