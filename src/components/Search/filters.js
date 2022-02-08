// constantes para filtros de facturas

// filtro de criterio
const criterionList = [
  {
    id: 0,
    name: "Fecha Ingreso",
  },
  {
    id: 1,
    name: "Fecha Vcto PuertoX",
  },
]

// filtro de estado de las facturas
const statusList = [
  { id: 0, name: "Todos los estados" },
  { id: 1, name: "Disponible" },
  { id: 2, name: "Cotizada" },
  { id: 3, name: "Ofertada" },
  { id: 4, name: "Validando SII" },
  { id: 5, name: "En Custodia" },
  { id: 6, name: "Cesión Rechazada SII" },
  { id: 7, name: "Solicitud Retiro Custodia" },
  { id: 8, name: "Retiro Custodia" },
  { id: 9, name: "Pagado a BPC S&N" },
  { id: 10, name: "Validando Confirmación Fecha de Pago" },
  { id: 11, name: "Pagador por Validar Operaciones" },
  { id: 12, name: "No Cedible" },
  { id: 13, name: "Fecha Inicio Actividades Emisor Fuera de" },
  { id: 14, name: "Rango" },
  { id: 15, name: "Fecha Inicio Actividades Pagador Fuera de Rango" },
  { id: 16, name: "Pagador No Vigente" },
  { id: 17, name: "Solicitando Garantía Mercado OTC" },
  { id: 18, name: "Pagada a Tenedor" },
  { id: 19, name: "Bloqueada - Transar en Bolsa" },
  { id: 20, name: "En revisión BPC" },
  { id: 21, name: "Liberada para Negociación" },
  { id: 22, name: "Pagada a la Bolsa" },
  { id: 23, name: "En Nemotécnico - Disponible" },
  { id: 24, name: "En Nemotécnico - Negociación" },
  { id: 25, name: "Pendiente de Liquidación" },
  { id: 26, name: "Solicitud Anulación Transacción" },
  { id: 27, name: "En Proceso Validación" },
]

// filtro de tipo de factura DTE
const docTypeList = [
  { id: 1, name: "-" },
  { id: 33, name: "33: Factura electrónica" },
  { id: 34, name: "34: Factura no afecta o exenta electrónica" },
  { id: 46, name: "46: Factura de compra" },
]

module.exports = {
  criterionList,
  statusList,
  docTypeList,
}
