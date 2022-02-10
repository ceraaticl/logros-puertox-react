import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import Button from "components/Button"
import ActionModal from "components/ActionModal"
import columns from "./headers.js"
import axios from "axios"

const Footer = ({ billCount, totalBills }) => {
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

export default function Table({
  user,
  searchFilters,
  isLoading,
  setIsLoading,
}) {
  const [selectionModel, setSelectionModel] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [isNotifier, setIsNotifier] = useState()

  const [bills, setBills] = useState([])

  useEffect(() => {
    const getBills = async (searchFilters) => {
      try {
        setIsLoading(true)
        setBills([])
        const billResponse = await axios.post(
          "facturas/consultar",
          searchFilters
        )
        if (!billResponse.data.message) {
          setBills(billResponse.data.billList)
          setIsNotifier(billResponse.data.isNotifier)
        } else {
          setBills([])
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    if (Object.entries(searchFilters).length !== 0) {
      getBills(searchFilters)
    }
  }, [user, searchFilters, setIsLoading])

  return (
    <div className="w-5/6 mx-auto flex md:h-[34rem] mt-8">
      <DataGrid
        rows={bills}
        columns={columns.map((col) => ({ ...col, sortable: false }))}
        checkboxSelection={isNotifier}
        disableColumnFilter
        disableColumnMenu
        disableSelectAllCheckbox
        hideFooterPagination
        hideFooter={!isNotifier}
        loading={isLoading}
        initialState={{ pinnedColumns: { left: ["notif"] } }}
        onSelectionModelChange={(newSelectionModel) => {
          const selectedIDs = new Set(newSelectionModel)
          const newSelectedData = bills.filter((row) => {
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
          Footer: () => (
            <Footer
              billCount={selectionModel.length}
              totalBills={bills.length}
            />
          ),
        }}
      />
    </div>
  )
}
