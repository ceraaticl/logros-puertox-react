import Button from "components/Button"
import NotificationModal from "components/NotificationModal"
import Tooltip from "@mui/material/Tooltip"
import { useState } from "react"
import exportExcel from "utils/exportExcel"
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid"
import { Pagination } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root.Mui-selected": {
      color: "white",
      backgroundColor: "red",
    },
  },
}))

/**
 * footer de la tabla de facturas, muestra el total de facturas y  muestra los botones de notificar y descargar
 */
export default function TableFooter({
  billCount,
  totalBills,
  selectedBills,
  bills,
}) {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }

  const buttonText =
    billCount === 0
      ? "Selecciona facturas"
      : `Notificar ${billCount} ${billCount === 1 ? "Factura" : "Facturas"}`

  const handleDownload = () => {
    // toma los datos de resultados para descargarlos a un excel
    exportExcel(`facturas_depositadas_px`, bills)
  }
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <>
      <div className="grid grid-cols-3 p-2">
        <div className="flex items-center text-base ml-2">{`Total: ${totalBills} ${
          totalBills === 1 ? "Factura" : "Facturas"
        }`}</div>
        <div className="w-80 flex place-self-center gap-2">
          <Button
            text={buttonText}
            color="red"
            disabled={billCount === 0}
            onClick={handleClick}
          />
          <Tooltip title="Descarga un excel con los resutlados" placement="top">
            <span className="w-full">
              <Button
                text="Descargar"
                color="green"
                disabled={totalBills === 0}
                onClick={handleDownload}
              />
            </span>
          </Tooltip>
        </div>
        <div className="flex place-self-end self-center">
          <Pagination
            count={pageCount}
            page={page + 1}
            showFirstButton
            showLastButton
            classes={{ ul: classes.ul }}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
          />
        </div>
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        selectedBills={selectedBills}
      />
    </>
  )
}
