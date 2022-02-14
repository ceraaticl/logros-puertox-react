import { useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from "assets/images/logo-sm.png"
import { LogoutIcon } from "@heroicons/react/outline"
import Tooltips from "@material-tailwind/react/Tooltips"
import TooltipsContent from "@material-tailwind/react/TooltipsContent"

import { useRef } from "react"

/**
 * barra de navegacion de la app, se muestra siempre
 * si el usuario esta logueado muestra su nombre de usuario y un boton para logout
 */
export default function Navbar({ user }) {
  const isLogin = localStorage.getItem("token") && true

  const buttonRef = useRef()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/")
  }

  return (
    <nav className="bg-[#EEEEEE]">
      <div className="w-5/6 mx-auto px-2">
        <div className="relative flex justify-start h-12">
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 flex justify-start">
              <img className="block h-8 w-auto" src={logo} alt="logo" />
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            {isLogin ? (
              <>
                <div className="flex-shrink-0 flex items-center mr-4">
                  {localStorage.username}
                </div>

                <button ref={buttonRef} onClick={() => handleLogout()}>
                  <LogoutIcon className="h-6 w-6" />
                </button>
                <Tooltips placement="bottom" ref={buttonRef}>
                  <TooltipsContent>Cerrar sesión</TooltipsContent>
                </Tooltips>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}
