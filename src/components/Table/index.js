import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import Button from "components/Button"
import ActionModal from "components/ActionModal"
import columns from "./headers.js"

const rows = [
  {
    id: 1,
    rut_tenedor: "99999999-9",
    razon_social_tenedor: "XXXXXXXXXXXXX",
    fecha_ingreso: "2022-01-01",
    fecha_venc_ptox: "2022-01-01",
    fecha_transaccion_transferencia: "2022-01-01",
    rut_emisor: "99999999-9",
    razon_social_emisor: "XXXXXXXXXXXXX",
    tipo_documento: 33,
    folio: "111111",
    clase_factura: "D",
    monto_factura: 200000,
    monto_pag_tenedor: 0,
    monto_custodia: 200000,
    origen_pago: "NO APLICA",
    fecha_pago_px: "2022-01-01",
    fecha_pago_tenedor: "2022-01-01",
    fecha_rec_logros: "2022-01-01",
    rut_pagador: "99999999-9",
    razón_social_pagador: "XXXXXXXXXXXXX",
    rut_garantizador: "99999999-9",
    razón_social_garantizador: "XXXXXXXXXXXXX",
    porcentaje_garantia: "100%",
    dif_saldo: 0,
    estado: "En custodia",
  },
  {
    id: 2,
    rut_tenedor: "99999999-9",
    razon_social_tenedor: "XXXXXXXXXXXXX",
    fecha_ingreso: "2022-01-01",
    fecha_venc_ptox: "2022-01-01",
    fecha_transaccion_transferencia: "2022-01-01",
    rut_emisor: "99999999-9",
    razon_social_emisor: "XXXXXXXXXXXXX",
    tipo_documento: 33,
    folio: "111111",
    clase_factura: "D",
    monto_factura: 200000,
    monto_pag_tenedor: 0,
    monto_custodia: 200000,
    origen_pago: "NO APLICA",
    fecha_pago_px: "2022-01-01",
    fecha_pago_tenedor: "2022-01-01",
    fecha_rec_logros: "2022-01-01",
    rut_pagador: "99999999-9",
    razón_social_pagador: "XXXXXXXXXXXXX",
    rut_garantizador: "99999999-9",
    razón_social_garantizador: "XXXXXXXXXXXXX",
    porcentaje_garantia: "100%",
    dif_saldo: 0,
    estado: "En custodia",
  },
  {
    id: 3,
    rut_tenedor: "99999999-9",
    razon_social_tenedor: "XXXXXXXXXXXXX",
    fecha_ingreso: "2022-01-01",
    fecha_venc_ptox: "2022-01-01",
    fecha_transaccion_transferencia: "2022-01-01",
    rut_emisor: "99999999-9",
    razon_social_emisor: "XXXXXXXXXXXXX",
    tipo_documento: 33,
    folio: "111111",
    clase_factura: "D",
    monto_factura: 200000,
    monto_pag_tenedor: 0,
    monto_custodia: 200000,
    origen_pago: "NO APLICA",
    fecha_pago_px: "2022-01-01",
    fecha_pago_tenedor: "2022-01-01",
    fecha_rec_logros: "2022-01-01",
    rut_pagador: "99999999-9",
    razón_social_pagador: "XXXXXXXXXXXXX",
    rut_garantizador: "99999999-9",
    razón_social_garantizador: "XXXXXXXXXXXXX",
    porcentaje_garantia: "100%",
    dif_saldo: 0,
    estado: "En custodia",
  },
  {
    id: 4,
    rut_tenedor: "99999999-9",
    razon_social_tenedor: "XXXXXXXXXXXXX",
    fecha_ingreso: "2022-01-01",
    fecha_venc_ptox: "2022-01-01",
    fecha_transaccion_transferencia: "2022-01-01",
    rut_emisor: "99999999-9",
    razon_social_emisor: "XXXXXXXXXXXXX",
    tipo_documento: 33,
    folio: "111111",
    clase_factura: "D",
    monto_factura: 200000,
    monto_pag_tenedor: 0,
    monto_custodia: 200000,
    origen_pago: "NO APLICA",
    fecha_pago_px: "2022-01-01",
    fecha_pago_tenedor: "2022-01-01",
    fecha_rec_logros: "2022-01-01",
    rut_pagador: "99999999-9",
    razón_social_pagador: "XXXXXXXXXXXXX",
    rut_garantizador: "99999999-9",
    razón_social_garantizador: "XXXXXXXXXXXXX",
    porcentaje_garantia: "100%",
    dif_saldo: 0,
    estado: "En custodia",
  },
  {
    id: 5,
    rut_tenedor: "99999999-9",
    razon_social_tenedor: "XXXXXXXXXXXXX",
    fecha_ingreso: "2022-01-01",
    fecha_venc_ptox: "2022-01-01",
    fecha_transaccion_transferencia: "2022-01-01",
    rut_emisor: "99999999-9",
    razon_social_emisor: "XXXXXXXXXXXXX",
    tipo_documento: 33,
    folio: "111111",
    clase_factura: "D",
    monto_factura: 200000,
    monto_pag_tenedor: 0,
    monto_custodia: 200000,
    origen_pago: "NO APLICA",
    fecha_pago_px: "2022-01-01",
    fecha_pago_tenedor: "2022-01-01",
    fecha_rec_logros: "2022-01-01",
    rut_pagador: "99999999-9",
    razón_social_pagador: "XXXXXXXXXXXXX",
    rut_garantizador: "99999999-9",
    razón_social_garantizador: "XXXXXXXXXXXXX",
    porcentaje_garantia: "100%",
    dif_saldo: 0,
    estado: "En custodia",
  },
  {
    id: 6,
    rut_tenedor: "99999999-9",
    razon_social_tenedor: "XXXXXXXXXXXXX",
    fecha_ingreso: "2022-01-01",
    fecha_venc_ptox: "2022-01-01",
    fecha_transaccion_transferencia: "2022-01-01",
    rut_emisor: "99999999-9",
    razon_social_emisor: "XXXXXXXXXXXXX",
    tipo_documento: 33,
    folio: "111111",
    clase_factura: "D",
    monto_factura: 200000,
    monto_pag_tenedor: 0,
    monto_custodia: 200000,
    origen_pago: "NO APLICA",
    fecha_pago_px: "2022-01-01",
    fecha_pago_tenedor: "2022-01-01",
    fecha_rec_logros: "2022-01-01",
    rut_pagador: "99999999-9",
    razón_social_pagador: "XXXXXXXXXXXXX",
    rut_garantizador: "99999999-9",
    razón_social_garantizador: "XXXXXXXXXXXXX",
    porcentaje_garantia: "100%",
    dif_saldo: 0,
    estado: "En custodia",
  },
]

const Footer = ({ billCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }
  const buttonText =
    billCount === 0 ? "Selecciona facturas" : `Notificar ${billCount} Facturas`

  return (
    <>
      <div className="flex justify-center p-2">
        <div className="w-40">
          <Button
            text={buttonText}
            color="red"
            disabled={billCount === 0}
            onClick={handleClick}
          />
        </div>
      </div>
      <ActionModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  )
}

export default function Table() {
  const [selectionModel, setSelectionModel] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [isNotifier, setIsNotifier] = useState()

  useEffect(() => {
    const userIsNotifier = localStorage.getItem("isNotifier")
    setIsNotifier(userIsNotifier === "true")
  }, [])

  return (
    <div className="w-5/6 mx-auto flex md:h-[34rem] mt-8 ">
      <DataGrid
        rows={rows}
        columns={columns.map((col) => ({ ...col, sortable: false }))}
        checkboxSelection={isNotifier}
        disableColumnFilter
        disableColumnMenu
        disableSelectAllCheckbox
        hideFooterPagination
        hideFooter={!isNotifier}
        initialState={{ pinnedColumns: { left: ["notif"] } }}
        onSelectionModelChange={(newSelectionModel) => {
          const selectedIDs = new Set(newSelectionModel)
          const newSelectedData = rows.filter((row) => {
            return selectedIDs.has(row.id)
          })
          setSelectedData(newSelectedData)
          setSelectionModel(newSelectionModel)
        }}
        selectionModel={selectionModel}
        sx={{
          backgroundColor: "white",
          boxShadow: 2,
          "& .MuiDataGrid-cell:hover": {
            color: "red",
          },
        }}
        components={{
          Footer: () => <Footer billCount={selectionModel.length} />,
        }}
      />
    </div>
  )
}
