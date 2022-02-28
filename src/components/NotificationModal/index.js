/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/solid"
import { TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DatePicker from "@mui/lab/DatePicker"
import Input from "@material-tailwind/react/Input"
import localeEs from "date-fns/locale/es"
import LocalizationProvider from "@mui/lab/LocalizationProvider"

import Button from "components/Button"
import InfoModal from "components/InfoModal"
import isValidDate from "utils/isValidDate"
import Select from "components/Select"
import sendPayNotification from "./sendPayNotification"
/**
 * modal que se muestra al realizar alguna accion, se abre en base a la variable isOpen, y ejecuta cierta accion
 * cuando se cierra con la funcion onClose
 */
export default function NotificationModal({ isOpen, onClose, selectedBills }) {
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)
  const [isFileMissing, setIsFileMissing] = useState(false)
  const [isFutureDate, setIsFutureDate] = useState(false)
  const [isInvalidDate, setIsInvalidDate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWrongAmount, setIsWrongAmount] = useState(false)
  const [notificationResult, setnotificationResult] = useState(null)
  const [payDate, setPayDate] = useState(new Date())
  const [responseModalIsOpen, setResponseModalIsOpen] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [voucherFile, setVoucherFile] = useState(null)
  const [voucherName, setVoucherName] = useState("")
  const { handleSubmit } = useForm()
  const cancelButtonRef = useRef(null)
  let [billsToNotify, setBillsToNotify] = useState([])

  const payStateOptions = [
    { id: 3, name: "Pagado por deudor" },
    { id: 2, name: "Pagado por Logros", disabled: true },
  ]
  useEffect(() => {
    setBillsToNotify(selectedBills)
    if (billsToNotify.length > 0) {
      const sum = billsToNotify
        .map((bill) => parseFloat(bill.monto_factura))
        .reduce((acc, bill) => bill + acc)
      setTotalAmount(sum)
    }
    setPayDate(new Date())
    setIsFutureDate(false)
    setIsInvalidDate(false)
  }, [selectedBills, isOpen, billsToNotify])

  const handleNotification = async () => {
    if (!voucherFile) {
      setIsFileMissing(true)
    } else {
      setIsFileMissing(false)
      setIsLoading(true)
      const dataObj = {
        payDate,
        totalAmount,
        billsToNotify,
        voucher: voucherFile,
      }

      const notificationResponse = await sendPayNotification(dataObj)
      setnotificationResult(notificationResponse)
      setIsLoading(false)
      setResponseModalIsOpen(true)
    }
  }

  const handleInfoClick = () => {
    setInfoModalIsOpen(true)
  }

  const handleFileChange = (filesSelected) => {
    setVoucherName(filesSelected[0].name)
    setVoucherFile(filesSelected[0])
  }

  const ResultModalBody = () => (
    <div>
      {notificationResult.message ? (
        <div>
          <a
            href={notificationResult.voucherURL}
            className="underline text-sky-400 decoration-sky-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link al Comprobante Público
          </a>

          <p className="mt-2">
            Si te equivocaste en algún dato o en el comprobante, deberás
            comunicarte directamente con PuertoX
          </p>
        </div>
      ) : (
        <p>{notificationResult.error}</p>
      )}
    </div>
  )

  const InfoModalBody = () => (
    <div>
      <ol className="ml-4 list-decimal">
        <li>
          Puedes presionar Ctrl+Z para volver al monto original cuando estés
          editando el monto de alguna factura en caso de que hayas digitado mal
          el monto y olvidaste cual era el original
        </li>
        <li>
          El comprobante es obligatorio, y el archivo debe contener todos los
          comprobantes referentes a la notificación en caso de notificar más de
          una factura o notificar una factura que posee múltiples comprobantes.
          Si lo descrito anteriormente es tu caso, se recomienda crear un
          archivo PDF desde Word, en donde dispongas las imágenes de cada
          comprobante involucrado. Los formatos recomendados para imagen: png,
          jpg, jpeg. Para documento: PDF.
        </li>
      </ol>
    </div>
  )

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 h-5/6"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-75 bg-gray-500/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-1/2 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
              <div className="px-4 pt-5 bg-white">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="flex justify-center w-full">
                        Notificar pagos de facturas a PuertoX
                        <div className="self-start ml-4 text-xl text-red-600 justify-self-end">
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={handleInfoClick}
                          >
                            <InformationCircleIcon className="w-7 h-7" />
                          </button>
                          <InfoModal
                            title="Información de ayuda"
                            body={<InfoModalBody />}
                            closeButtonText="¡Entendido!"
                            isOpen={infoModalIsOpen}
                            setIsOpen={setInfoModalIsOpen}
                          />
                        </div>
                      </div>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Estás seguro(a) de enviar a notificar el pago de las
                        siguientes facturas a Puerto X? (Puedes modificar el
                        monto a notificar)
                      </p>
                    </div>
                    <div className="max-h-[40rem] overflow-y-auto">
                      <div className="my-6 bg-white rounded">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr>
                              <th className="px-4 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                                Estado pago
                              </th>
                              <th className="px-4 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                                RUT Emisor
                              </th>
                              <th className="px-4 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                                Folio
                              </th>
                              <th className="px-4 py-4 text-sm font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                                DTE
                              </th>
                              <th className="px-4 py-4 text-sm font-bold text-right uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                                Monto
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {billsToNotify.map((bill) => {
                              return (
                                <tr
                                  key={bill.id}
                                  className="hover:bg-grey-lighter"
                                >
                                  <td className="px-4 py-4 border-b border-grey-light">
                                    <Select
                                      label=""
                                      options={payStateOptions}
                                      setValue={(data) => {
                                        bill.payState = data.id
                                      }}
                                    />
                                  </td>
                                  <td className="px-4 py-4 border-b border-grey-light">
                                    {bill.rut_emisor}
                                  </td>
                                  <>
                                    <td className="px-4 py-4 border-b border-grey-light">
                                      {bill.folio}
                                    </td>
                                    <td className="px-4 py-4 border-b border-grey-light">
                                      {bill.tipo_documento}
                                    </td>
                                    <td className="px-4 py-4 text-right border-b border-grey-light">
                                      <Input
                                        type="number"
                                        placeholder=""
                                        color="red"
                                        style={{ textAlign: "right" }}
                                        value={bill.monto_factura}
                                        onChange={(e) => {
                                          if (e.target.value === "") {
                                            setIsWrongAmount(true)
                                          } else {
                                            setIsWrongAmount(false)
                                          }

                                          setBillsToNotify(
                                            billsToNotify.map((billMod) => {
                                              if (billMod.id === bill.id) {
                                                billMod.monto_factura =
                                                  parseInt(e.target.value)
                                                return billMod
                                              } else {
                                                return billMod
                                              }
                                            })
                                          )
                                        }}
                                        ref={null}
                                      />
                                    </td>
                                  </>
                                </tr>
                              )
                            })}
                            <tr>
                              <td colSpan="2">
                                <div className="px-4 py-2 bg-white">
                                  <div className="max-w-sm mx-auto overflow-hidden rounded-lg md:max-w-sm hover:cursor-pointer">
                                    <div className="w-full">
                                      <div className="relative flex items-center justify-center bg-gray-100 border-2 border-blue-700 border-dashed rounded-lg ">
                                        <div className="absolute">
                                          <div className="flex flex-row items-center p-1">
                                            <span className="text-sm text-gray-400 truncate text-ellipsis">
                                              {voucherName === "" ? (
                                                <span>
                                                  Click para subir comprobante
                                                </span>
                                              ) : (
                                                voucherName
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                        <form>
                                          <input
                                            required
                                            accept=".png, .jpg, .jpeg, .pdf"
                                            id="voucher-input"
                                            onChange={(e) =>
                                              handleFileChange(e.target.files)
                                            }
                                            type="file"
                                            className="w-full h-full opacity-0 hover:cursor-pointer"
                                            name="voucher"
                                          />
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td></td>
                              <td className="px-4 py-4 font-bold border-b border-grey-light">
                                {"Total"}
                              </td>
                              <td className="px-4 py-4 font-bold text-right border-b border-grey-light">
                                {totalAmount.toLocaleString() === "NaN"
                                  ? "-"
                                  : totalAmount.toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {notificationResult && (
                          <InfoModal
                            title={
                              notificationResult.message ||
                              notificationResult.error
                            }
                            body={<ResultModalBody />}
                            closeButtonText="Salir"
                            isOpen={responseModalIsOpen}
                            setIsOpen={setResponseModalIsOpen}
                            onClose={onClose}
                          />
                        )}

                        <div className="flex items-end justify-center h-10">
                          {isWrongAmount ? (
                            <span className="text-red-500">
                              ¡No dejes montos en blanco!
                            </span>
                          ) : isFileMissing ? (
                            <span className="text-red-500">
                              Adjuntar comprobante es obligatorio
                            </span>
                          ) : (
                            <span>Pincha fuera del cuadro para cancelar</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse gap-60">
                <div className="w-full">
                  <Button
                    text="Enviar"
                    color="red"
                    type="button"
                    onClick={handleSubmit(handleNotification)}
                    loading={isLoading}
                    disabled={isFutureDate || isInvalidDate || isWrongAmount}
                  />
                </div>

                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={localeEs}
                >
                  <DatePicker
                    label="Fecha de pago"
                    value={payDate}
                    disableFuture
                    disableOpenPicker
                    onChange={(newValue) => {
                      setPayDate(newValue)
                      newValue > new Date()
                        ? setIsFutureDate(true)
                        : setIsFutureDate(false)

                      isValidDate(newValue)
                        ? setIsInvalidDate(false)
                        : setIsInvalidDate(true)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        size="small"
                        error={isFutureDate || isInvalidDate}
                        helperText={
                          isFutureDate
                            ? "Fecha futura"
                            : isInvalidDate
                            ? "Fecha inválida"
                            : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
