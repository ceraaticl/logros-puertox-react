import Search from "components/Search"
import Table from "components/Table"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

/**
 * pantalla de facturas, solo los usuarios logueados pueden ver esta pantalla.
 *
 * la pantalla se divide en una seccion de busqueda y en una de datos, el usuario selecciona filtros en la primera
 * y se muestran los resultados en la segunda
 */
export default function Bills() {
  let navigate = useNavigate()
  const { state } = useLocation()

  const [searchFilters, setSearchFilters] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.token) {
      // si no hay un token de sesion, se muestra la pantalla de login
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="flex-col">
      <div className="flex-none">
        <Search
          user={state}
          setSearchFilters={setSearchFilters}
          isLoading={isLoading}
        />
      </div>
      <div className="flex grow md:mb-6">
        <Table
          user={state}
          searchFilters={searchFilters}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  )
}
