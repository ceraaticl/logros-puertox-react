import { Tooltip } from "@mui/material"

const headers = [
  "RUT tenedor",
  "Razón social tenedor",
  "Fecha ingreso",
  "Vencimiento PuertoX",
  "Fecha transferencia",
  "RUT emisor",
  "Razón social emisor",
  "Tipo documento",
  "Folio",
  "Clase",
  "Monto factura",
  "Monto pagado a tenedor",
  "Monto en custodia de la factura",
  "Origen de pago",
  "Fecha pago PuertoX",
  "Fecha pago tenedor",
  "Fecha recaudación Logros",
  "RUT pagador",
  "Razón social pagador",
  "RUT garantizador",
  "Razón social garantizador",
  "Porcentaje garantía",
  "Diferencia entre saldo de PuertoX y Logros",
  "Estado",
]

const headersDataName = [
  "rut_tenedor",
  "razon_social_tenedor",
  "fecha_ingreso",
  "fecha_venc_ptox",
  "fecha_transaccion_transferencia",
  "rut_emisor",
  "razon_social_emisor",
  "tipo_documento",
  "folio",
  "clase_factura",
  "monto_factura",
  "monto_pag_tenedor",
  "monto_custodia",
  "origen_pago",
  "fecha_pago_px",
  "fecha_pago_tenedor",
  "rut_pagador",
  "razón_social_pagador",
  "rut_garantizador",
  "razón_social_garantizador",
  "porcentaje_garantia",
  "estado",
]

// configuracion de nombres de columnas para la tabla que muestra las facturas
const columns = [
  { field: "id", headerName: "ID", width: 50, hide: true },
  {
    field: "rut_tenedor",
    headerName: "RUT tenedor",
    type: "string",
    renderCell: (params) =>
      !params.row.dif_saldo ? (
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
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_tenedor} />
    ),
    width: 200,
  },
  {
    field: "fecha_ingreso",
    headerName: "F. Ingreso",
    type: "date",
    width: 100,
  },
  {
    field: "fecha_venc_ptox",
    headerName: "Vencimiento PuertoX",
    type: "date",
    width: 100,
  },
  {
    field: "fecha_transaccion_transferencia",
    headerName: "F. Transf.",
    type: "date",
    width: 100,
  },
  {
    field: "rut_emisor",
    headerName: "RUT emisor",
    type: "string",
    width: 120,
  },
  {
    field: "razon_social_emisor",
    headerName: "Razón social emisor",
    type: "string",
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_emisor} />
    ),
    width: 200,
  },
  {
    field: "tipo_documento",
    headerName: "DTE",
    type: "number",
    width: 70,
  },
  {
    field: "folio",
    headerName: "Folio",
    type: "number",
    width: 90,
  },
  {
    field: "clase_factura",
    headerName: "Clase",
    type: "string",
    align: "center",
    width: 70,
  },
  {
    field: "monto_factura",
    headerName: "Monto factura",
    type: "number",
    width: 150,
  },
  {
    field: "monto_pag_tenedor",
    headerName: "Monto pagado a tenedor",
    type: "number",
    width: 150,
  },
  {
    field: "monto_custodia",
    headerName: "Monto en custodia",
    type: "number",
    width: 150,
  },
  {
    field: "origen_pago",
    headerName: "Origen de pago",
    type: "string",
    width: 140,
  },
  {
    field: "fecha_pago_px",
    headerName: "F. pago PuertoX",
    type: "date",
    width: 100,
  },
  {
    field: "fecha_pago_tenedor",
    headerName: "F. pago tenedor",
    type: "date",
    width: 100,
  },
  {
    field: "fecha_rec_logros",
    headerName: "F. recaudación Logros",
    type: "date",
    width: 100,
  },
  {
    field: "rut_pagador",
    headerName: "RUT pagador",
    type: "string",
    width: 120,
  },
  {
    field: "razon_social_pagador",
    headerName: "Razón social pagador",
    type: "string",
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_pagador} />
    ),
    width: 150,
  },
  {
    field: "rut_garantizador",
    headerName: "RUT garantizador",
    type: "string",
    width: 120,
  },
  {
    field: "razon_social_garantizador",
    headerName: "Razón social garantizador",
    type: "string",
    renderCell: (params) => (
      <OverflowRow name={params.row.razon_social_garantizador} />
    ),
    width: 150,
  },
  {
    field: "porcentaje_garantia",
    headerName: "Garantía",
    type: "number",
    width: 90,
  },
  {
    field: "dif_saldo",
    headerName: "Dif. saldo PuertoX-Logros",
    type: "number",
    width: 150,
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "string",
    width: 100,
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
