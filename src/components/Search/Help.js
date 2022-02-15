export default function Help() {
  return (
    <div className="ml-4">
      <ol class="list-decimal">
        <li>
          Parámetros obligatorios para realizar una búsqueda individual:
          <ul className="list-disc ml-8">
            <li>RUT Emisor</li>
            <li>DTE</li>
            <li>Folio</li>
          </ul>
        </li>
        <li>
          Opcionalmente puedes buscar ingresando el RUT custodio y no es
          necesario incluir los parámetros de busqueda individual.
        </li>
        <li>
          Cuando se realiza una búsqueda individual, no son tomados en cuenta
          los siguientes parámetros: fecha desde y fecha hasta (así funcionan
          las APIs de PuertoX).
        </li>
        <li>
          Puedes filtrar por valores arbitrarios en la columna "Dif. Saldo
          PuertoX-Logros" y además ordenarla, junto con esto, también puedes
          ordenar por la fecha de vencimiento de la factura.
        </li>
      </ol>
    </div>
  )
}
