import { XCircleIcon } from "@heroicons/react/solid"

/**
 * componente reusable para mostrar un error en pantalla, recibe ele error (mensaje) y una funcion que limpia el error
 * al cerrar la alerta mostrada
 */
export default function ErrorAlert({ error, setError }) {
  return (
    <div
      className="p-2 bg-red-700 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        Error
      </span>
      <span className="font-semibold mr-2 text-white text-left flex-auto">
        {error}
      </span>
      <button
        className="!border-none !outline-hidden"
        onClick={() => setError("")}
      >
        <XCircleIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  )
}
