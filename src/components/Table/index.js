import { useEffect, useState } from "react"
import {
  DataGrid,
  GridColumnMenuContainer,
  GridFilterMenuItem,
} from "@mui/x-data-grid"

import columns from "./headers.js"
import axios from "axios"
import { Stack } from "@mui/material"
import TableFooter from "./TableFooter.js"

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn } = props
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn}>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  )
}

/**
 * tabla que se encarga de mostrar organizadamente los datos de las facturas obtenidas de la api
 * interna para que las vea el usuario, segun el tipo de usuario se muestra la positibilidad de notificar
 * las facturas y descargar los datos en excel (Footer de la tabla, parte inferior)
 */
export default function Table({
  user,
  searchFilters,
  isLoading,
  setIsLoading,
}) {
  const [selectionModel, setSelectionModel] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [isNotifier, setIsNotifier] = useState()
  const [hasMadeSearch, setHasMadeSearch] = useState(false)

  const [bills, setBills] = useState([])

  useEffect(() => {
    const getBills = async (searchFilters) => {
      try {
        setIsLoading(true)
        setHasMadeSearch(true)
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
        columns={columns}
        autoPageSize
        checkboxSelection={isNotifier}
        disableSelectAllCheckbox
        hideFooter={!isNotifier}
        loading={isLoading}
        initialState={{ pinnedColumns: { left: ["notif"] } }}
        onSelectionModelChange={(newSelectionModel) => {
          const selectedIDs = new Set(newSelectionModel)
          const newSelectedData = bills.filter((row) => {
            return selectedIDs.has(row.id)
          })
          const necessaryData = newSelectedData.map((bill) => {
            return {
              id: bill.id,
              rut_emisor: bill.rut_emisor,
              folio: bill.folio,
              tipo_documento: bill.tipo_documento,
              monto_factura: bill.monto_factura,
            }
          })
          setSelectedData(necessaryData)
          setSelectionModel(newSelectionModel)
        }}
        selectionModel={selectionModel}
        sx={{
          backgroundColor: "white",
          boxShadow: 2,
          "& .MuiDataGrid-cell:hover": {
            fontWeight: "bold",
          },
          "& .row-error": {
            bgcolor: "#FF3333",
            "&:hover": {
              bgcolor: "#CF000F",
            },
          },
        }}
        getRowClassName={(params) =>
          params.row.dif_saldo === null && "row-error"
        }
        components={{
          Footer: () => (
            <TableFooter
              billCount={selectionModel.length}
              totalBills={bills.length}
              selectedBills={selectedData}
              bills={bills}
            />
          ),
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              {hasMadeSearch
                ? "No se encontraron resultados con los filtros usados"
                : "Realiza una búsqueda"}
            </Stack>
          ),
          ColumnMenu: CustomColumnMenu,
        }}
      />
    </div>
  )
}
