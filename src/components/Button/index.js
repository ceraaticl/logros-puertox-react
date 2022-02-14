/**
 * componente reusable, boton que recibe el tipo, texto que muestra, color (red, green y blue)
 * una funcion onClick para ejecutar, y dos estados: cargando y deshabilitado
 *
 * se pueden agregar mas colores y estados para representar mas situaciones
 */
export default function Button({
  type,
  text,
  color,
  onClick,
  loading = false,
  disabled = false,
}) {
  // const style =
  //   color === "blue"
  //     ? "w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-md shadow-lg shadow-blue-500/50 text-white text-sm my-4"
  //     : "w-full py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-md shadow-lg shadow-red-500/50 text-white text-sm my-4"
  return (
    <button
      type={type}
      className={`w-full py-2 bg-gradient-to-r rounded-md shadow-lg text-white text-sm focus:outline-none ${
        color === "red"
          ? "from-red-600 to-red-500 shadow-red-500/50"
          : color === "blue"
          ? "from-blue-600 to-blue-500 shadow-blue-500/50"
          : "from-green-600 to-green-500 shadow-green-500/50"
      } ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <svg
          className="animate-spin mx-auto h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        text
      )}
    </button>
  )
}
