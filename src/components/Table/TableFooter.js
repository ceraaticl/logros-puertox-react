import Button from "components/Button"
import ActionModal from "components/ActionModal"
import { useState } from "react"

/**
 * footer de la tabla de facturas, muestra el total de facturas y  muestra los botones de notificar y descargar
 */
export default function TableFooter({ billCount, totalBills }) {
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
          <Button
            text="Descargar"
            color="green"
            disabled={billCount === 0}
            onClick={handleClick}
          />
        </div>
      </div>
      <ActionModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  )
}
