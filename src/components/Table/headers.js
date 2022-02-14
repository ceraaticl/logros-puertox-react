import Tooltip from "@mui/material/Tooltip"
import { getGridNumericColumnOperators } from "@mui/x-data-grid"

// configuracion de nombres de columnas para la tabla que muestra las facturas
const columns = [
  { field: "id", headerName: "ID", width: 50, hide: true },
  {
    field: "rut_tenedor",
    headerName: "RUT tenedor",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) =>
      params.row.dif_saldo === null ? (
        <Tooltip title="ATENCIÓN! ESTA FACTURA NO CUENTA CON INFORMACIÓN EN LOGROS, FAVOR REVISAR">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {params.row.rut_tenedor}
          </span>
        </Tooltip>
      ) : (
        <span>{params.row.rut_tenedor}</span>
      ),
    width: 120,
  },
  {
    field: "razon_social_tenedor",
    headerName: "Razón social tenedor",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_tenedor} />
    ),
    width: 200,
  },
  {
    field: "fecha_ingreso",
    headerName: "F. Ingreso",
    type: "date",
    disableColumnMenu: true,
    width: 100,
  },
  {
    field: "fecha_venc_ptox",
    headerName: "Vencimiento PuertoX",
    type: "date",
    disableColumnMenu: true,
    sortable: true,
    width: 110,
  },
  {
    field: "fecha_transaccion_transferencia",
    headerName: "F. Transf.",
    type: "date",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
  },
  {
    field: "rut_emisor",
    headerName: "RUT emisor",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    width: 120,
  },
  {
    field: "razon_social_emisor",
    headerName: "Razón social emisor",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_emisor} />
    ),
    width: 200,
  },
  {
    field: "tipo_documento",
    headerName: "DTE",
    type: "number",
    disableColumnMenu: true,
    sortable: false,
    width: 70,
  },
  {
    field: "folio",
    headerName: "Folio",
    type: "number",
    disableColumnMenu: true,
    sortable: false,
    width: 90,
  },
  {
    field: "clase_factura",
    headerName: "Clase",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    align: "center",
    width: 70,
  },
  {
    field: "monto_factura",
    headerName: "Monto factura",
    type: "number",
    disableColumnMenu: true,
    sortable: false,
    width: 150,
  },
  {
    field: "monto_pag_tenedor",
    headerName: "Monto pagado a tenedor",
    type: "number",
    disableColumnMenu: true,
    sortable: false,
    width: 150,
  },
  {
    field: "monto_custodia",
    headerName: "Monto en custodia",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    align: "right",
    width: 150,
  },
  {
    field: "origen_pago",
    headerName: "Origen de pago",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    width: 140,
  },
  {
    field: "fecha_pago_px",
    headerName: "F. pago PuertoX",
    type: "date",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
  },
  {
    field: "fecha_pago_tenedor",
    headerName: "F. pago tenedor",
    type: "date",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
  },
  {
    field: "fecha_rec_logros",
    headerName: "F. recaudación Logros",
    type: "date",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
  },
  {
    field: "rut_pagador",
    headerName: "RUT pagador",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    width: 120,
  },
  {
    field: "razon_social_pagador",
    headerName: "Razón social pagador",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_pagador} />
    ),
    width: 200,
  },
  {
    field: "rut_garantizador",
    headerName: "RUT garantizador",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    width: 120,
  },
  {
    field: "razon_social_garantizador",
    headerName: "Razón social garantizador",
    type: "string",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_garantizador} />
    ),
    width: 200,
  },
  {
    field: "porcentaje_garantia",
    headerName: "Garantía",
    type: "number",
    disableColumnMenu: true,
    sortable: false,
    width: 90,
  },
  {
    field: "dif_saldo",
    headerName: "Dif. saldo PuertoX-Logros",
    type: "number",
    filterOperators: getGridNumericColumnOperators().filter(
      (operator) =>
        operator.value === ">" ||
        operator.value === "<" ||
        operator.value === "="
    ),
    disableColumnMenu: false,
    sortable: true,
    filterable: true,
    width: 160,
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "string",
    disableColumnMenu: true,
    width: 150,
  },
]

const OverflowRow = ({ name }) => (
  <Tooltip title={name}>
    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
      {name}
    </span>
  </Tooltip>
)

export default columns
