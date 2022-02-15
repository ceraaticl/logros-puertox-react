import Input from "@material-tailwind/react/Input"
import Button from "components/Button/index.js"
import Select from "components/Select"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"
import localeEs from "date-fns/locale/es"
import { criterionList, statusList, docTypeList } from "./filters.js"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { TextField } from "@mui/material"
import ErrorAlert from "components/ErrorAlert/index.js"
import { InformationCircleIcon } from "@heroicons/react/solid"
import InfoModal from "../InfoModal/index.js"
import Help from "./Help.js"

/**
 * seccion de busqueda, muestra diferentes inputs para que el usuario pueda filtrar los datos que quiere consultar
 */
export default function Search({ setSearchFilters, isLoading }) {
  const [criteria, setCriteria] = useState() // criterio de busqueda
  const [dateFrom, setDateFrom] = useState() // fecha desde
  const [dateTo, setDateTo] = useState() // fecha hasta
  const [status, setStatus] = useState() // estado de las facturas
  const [DTE, setDTE] = useState() // tipo de doc
  const [maxDate, setMaxDate] = useState() // fecha maxima para mostrar en los date picker
  const [minDate, setMinDate] = useState() // fecha maxima para mostrar en los date picker
  const [paramIsMissing, setParamIsMissing] = useState() // flag para mostrar error si es que falta algun parametro para la consulta
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (data) => {
    const today = new Date()
    // si el usuario no ha selecionado fecha se toma la de hoy
    if (!data.desde) data.desde = today
    if (!data.hasta) data.hasta = today

    let filters = {
      dateCriteria: String(criteria.id),
      from: data.desde.toISOString().split("T")[0],
      to: data.hasta.toISOString().split("T")[0],
      status: status.id,
    }

    // comprobar si es consulta individual para agregar parametros
    if (DTE.id !== 0 || data.rutEmisor || data.folio) {
      // si hay uno deben estar todos
      if (DTE.id && data.rutEmisor && data.folio) {
        filters = {
          ...filters,
          DTE: DTE.id === 0 ? "" : DTE.id,
          emitterID: data.rutEmisor,
          custodianID: data.rutCustodio,
          folio: parseInt(data.folio),
        }
      } else {
        setParamIsMissing(true)
      }
    }
    setSearchFilters(filters)
  }

  const handleInfoClick = () => {
    setInfoModalIsOpen(true)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-5/6 mx-auto h-64 mt-4 bg-white p-5 rounded-lg shadow-md grid grid-rows-[auto_auto_auto] grid-flow-col gap-0"
      >
        <div className="grid grid-cols-4 gap-8 items-end">
          <div>
            <h1 className="text-xl text-red-600">Consulta Masiva</h1>
            <Select
              label="Criterio"
              options={criterionList}
              setValue={setCriteria}
            />
          </div>
          <div className="mr-3">
            <Select label="Estado" options={statusList} setValue={setStatus} />
          </div>
          <div className="ml-3 grid grid-rows-2">
            <h1 className="text-xl self-start col-span-2 text-red-600">
              Consulta Individual
            </h1>
            <div className="col-span-2">
              <Controller
                name="rutEmisor"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Rut Emisor* (sólo con guión)"
                    color="red"
                    ref={null}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-rows-2">
            <div className="text-xl self-start justify-self-end text-red-600">
              <button
                type="button"
                className="cursor-pointer"
                onClick={handleInfoClick}
              >
                <InformationCircleIcon className="w-7 h-7" />
              </button>
              <InfoModal
                title="Información de ayuda"
                body={<Help />}
                closeButtonText="¡Entendido!"
                isOpen={infoModalIsOpen}
                setIsOpen={setInfoModalIsOpen}
              />
            </div>
            <Controller
              name="folio"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Folio*"
                  color="red"
                  ref={null}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 items-end mb-2">
          <div>
            <Controller
              name="desde"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={localeEs}
                >
                  <DatePicker
                    {...field}
                    maxDate={maxDate}
                    label="Desde"
                    value={dateFrom}
                    onChange={(newValue) => {
                      field.onChange(newValue)
                      setDateFrom(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        color="warning"
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
          <div className="mr-3">
            <Controller
              name="hasta"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={localeEs}
                >
                  <DatePicker
                    {...field}
                    maxDate={maxDate}
                    label="Hasta"
                    value={dateTo}
                    onChange={(newValue) => {
                      field.onChange(newValue)
                      setDateTo(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        color="warning"
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
          <div className="ml-3">
            <Controller
              name="tipoDoc"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="DTE*"
                  options={docTypeList}
                  ref={null}
                  setValue={setDTE}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="rutCustodio"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Rut Custodio (sólo con guión)"
                  color="red"
                  ref={null}
                />
              )}
            />
          </div>
        </div>

        {paramIsMissing ? (
          <div className="grid w-2/5 h-6 mx-auto mt-2 items-start animate-[bounce_1s]">
            <ErrorAlert
              error="Faltan parámetros de consulta individual"
              setError={setParamIsMissing}
            />
          </div>
        ) : (
          <div className="grid w-1/5 h-6 mx-auto mt-2 items-start">
            <Button
              type="submit"
              color="red"
              text="Consultar"
              loading={isLoading}
            />
          </div>
        )}
      </form>
    </>
  )
}
