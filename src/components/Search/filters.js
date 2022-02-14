// constantes para filtros de facturas

// filtro de criterio
const criterionList = [
  {
    id: "1",
    name: "Fecha Ingreso",
  },
  {
    id: "2",
    name: "Fecha Vcto PuertoX",
  },
]

// filtro de estado de las facturas
const statusList = [
  { id: 0, name: "Todos los estados" },
  { id: 1, name: "Disponible" },
  { id: 2, name: "Cotizada" },
  { id: 3, name: "Ofertada" },
  { id: 5, name: "Validando SII" },
  { id: 6, name: "En Custodia" },
  { id: 7, name: "Cesión Rechazada SII" },
  { id: 9, name: "Solicitud Retiro Custodia" },
  { id: 10, name: "Retiro Custodia" },
  { id: 11, name: "Pagado a BPC S&N" },
  { id: 12, name: "Validando Confirmación Fecha de Pago" },
  { id: 13, name: "Pagador por Validar Operaciones" },
  { id: 14, name: "No Cedible" },
  { id: 16, name: "Fecha Inicio Actividades Emisor Fuera de Rango" },
  { id: 17, name: "Fecha Inicio Actividades Pagador Fuera de Rango" },
  { id: 18, name: "Pagador No Vigente" },
  { id: 19, name: "Solicitando Garantía Mercado OTC" },
  { id: 20, name: "Pagada a Tenedor" },
  { id: 21, name: "Bloqueada - Transar en Bolsa" },
  { id: 23, name: "En revisión BPC" },
  { id: 24, name: "Liberada para Negociación" },
  { id: 25, name: "Pagada a la Bolsa" },
  { id: 26, name: "En Nemotécnico - Disponible" },
  { id: 27, name: "En Nemotécnico - Negociación" },
  { id: 28, name: "Pendiente de Liquidación" },
  { id: 29, name: "Solicitud Anulación Transacción" },
  { id: 30, name: "En Proceso Validación" },
]

// filtro de tipo de factura DTE
const docTypeList = [
  { id: 0, name: "Selecciona" },
  { id: 33, name: "33: Factura electrónica" },
  { id: 34, name: "34: Factura no afecta o exenta electrónica" },
  { id: 46, name: "46: Factura de compra" },
]

module.exports = {
  criterionList,
  statusList,
  docTypeList,
}
