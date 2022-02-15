import { useEffect, useState } from "react"
import {
  DataGrid,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid"

import columns from "./headers.js"
import axios from "axios"
import { Pagination, Stack } from "@mui/material"
import TableFooter from "./TableFooter.js"

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn } = props
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn}>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  )
}

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
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
          setSelectedData(newSelectedData)
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
              selectedBills={0}
              bills={bills}
            />
          ),
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Realiza una búsqueda
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No hay resultados para los filtros aplicados
            </Stack>
          ),
          ColumnMenu: CustomColumnMenu,
          //Pagination: CustomPagination,
        }}
      />
    </div>
  )
}
