import { useEffect, useState } from "react"
import logo from "assets/images/logo.png"
import InputIcon from "@material-tailwind/react/InputIcon"

import Button from "components/Button"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import ErrorAlert from "components/ErrorAlert"

async function handleLogin({ username, password }) {
  // login a la api interna desarrollada para el proyecto, los usuarios que pueden logearse
  // son los que estan en la tabla usuarios_puertox
  try {
    const res = await axios.post("auth/login", { username, password })
    return res.data
  } catch (error) {
    console.log(error.response.data.message)
    return { error: error.response.data }
  }
}

/**
 * pantalla de login de la app, formulario de usuario y password para entrar a la pantalla de facturas
 */
export default function Login({ setUser }) {
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.token) {
      navigate("/facturas")
    }
  }, [navigate])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = async (data) => {
    // cargar login
    setIsLoading(true)
    const loginResponse = await handleLogin(data)
    setIsLoading(false)

    if (loginResponse.error) {
      // si hay un error en el login se muestra
      setError(loginResponse.error.message)
    } else {
      // si el login es exitoso se guardan los datos de sesion y se muestra pantalla de facturas
      localStorage.setItem("token", loginResponse.token)
      localStorage.setItem("username", loginResponse.username)
      setUser(loginResponse)
      navigate("/facturas", { state: loginResponse })
    }
  }

  return (
    <div className="flex grow flex-col justify-center items-center">
      <div className="max-w-xs w-full mx-auto mt-4 bg-white p-8 rounded-lg shadow-md">
        <section className="flex justify-center mt-4 mb-10">
          <img src={logo} alt="logo" />
        </section>
        <section className="flex justify-center mt-4 mb-8">
          <h1 className="text-bold text-gray-800 text-2xl drop-shadow-md">
            Iniciar Sesión
          </h1>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="form space-y-6 my-2">
          <section className="mb-4">
            <div className="my-4">
              <Controller
                name="username"
                rules={{ required: true }}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputIcon
                    {...field}
                    iconName="person"
                    placeholder="Nombre de usuario"
                    color="red"
                    error={errors?.username && "Campo requerido"}
                    ref={null}
                  />
                )}
              />
            </div>
            <div className="mt-8 mb-4">
              <Controller
                name="password"
                rules={{ required: true }}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputIcon
                    {...field}
                    type="password"
                    iconName="lock"
                    placeholder="Contraseña"
                    color="red"
                    error={errors?.password && "Campo requerido"}
                    ref={null}
                  />
                )}
              />
            </div>
            <span className="mt-4"></span>
          </section>
          <Button type="submit" text="Entrar" color="red" loading={isLoading} />
        </form>
      </div>
      <div className="mt-4">
        {error && <ErrorAlert error={error} setError={setError} />}
      </div>
    </div>
  )
}
