/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "components/Button"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"
import localeEs from "date-fns/locale/es"
import { TextField } from "@mui/material"
import isValidDate from "utils/isValidDate"
import sendPayNotification from "./sendPayNotification"
import { useForm } from "react-hook-form"
import Input from "@material-tailwind/react/Input"
import { InformationCircleIcon } from "@heroicons/react/solid"
import InfoModal from "components/InfoModal"

/**
 * modal que se muestra al realizar alguna accion, se abre en base a la variable isOpen, y ejecuta cierta accion
 * cuando se cierra con la funcion onClose
 */
export default function NotificationModal({ isOpen, onClose, selectedBills }) {
  const [totalAmount, setTotalAmount] = useState(0)
  const [payDate, setPayDate] = useState(new Date())
  const [isFutureDate, setIsFutureDate] = useState(false)
  const [isInvalidDate, setIsInvalidDate] = useState(false)
  const cancelButtonRef = useRef(null)
  let [billsToNotify, setBillsToNotify] = useState([])
  const [isWrongAmount, setIsWrongAmount] = useState(false)
  const [isFileMissing, setIsFileMissing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)
  const [voucherName, setVoucherName] = useState("")
  const [voucherFile, setVoucherFile] = useState(null)
  const { handleSubmit } = useForm()
  const [responseModalIsOpen, setResponseModalIsOpen] = useState(false)
  const [notificationResult, setnotificationResult] = useState(null)

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

  //TODO: buscar evento onchange del voucherInputRef

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
            Si te equivocaste en algun dato o en el comprobante, deberás
            comunicarte directamente con PuertoX
          </p>
        </div>
      ) : (
        <p>{notificationResult.error}</p>
      )}
    </div>
  )

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 h-5/6"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/50 bg-opacity-75 transition-opacity" />
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0  sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      <div className="flex justify-center w-full">
                        Notificar pagos de facturas a PuertoX
                        <div className="text-xl self-start ml-4 justify-self-end text-red-600">
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={handleInfoClick}
                          >
                            <InformationCircleIcon className="w-7 h-7" />
                          </button>
                          <InfoModal
                            title="Información de ayuda"
                            body="Puedes presionar Ctrl+Z para volver al monto original cuando estés editando el monto de alguna factura en caso de que hayas digitado mal el monto y olvidaste cual era el original"
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
                      <div className="bg-white rounded my-6">
                        <table className="text-left w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="py-4 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                RUT Emisor
                              </th>
                              <th className="py-4 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                Folio
                              </th>
                              <th className="py-4 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                DTE
                              </th>
                              <th className="py-4 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
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
                                  <td className="py-4 px-4 border-b border-grey-light">
                                    {bill.rut_emisor}
                                  </td>
                                  <>
                                    <td className="py-4 px-4 border-b border-grey-light">
                                      {bill.folio}
                                    </td>
                                    <td className="py-4 px-4 border-b border-grey-light">
                                      {bill.tipo_documento}
                                    </td>
                                    <td className="py-4 px-4 border-b border-grey-light text-right">
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
                                                  e.target.value
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
                                <div className="py-2 bg-white">
                                  <div className="max-w-sm mx-auto rounded-lg overflow-hidden md:max-w-sm hover:cursor-pointer">
                                    <div className="w-full">
                                      <div className=" relative rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                                        <div className="absolute">
                                          <div className="flex flex-row items-center p-1">
                                            <span className="text-gray-400 text-sm truncate text-ellipsis">
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
                                            id="voucher-input"
                                            onChange={(e) =>
                                              handleFileChange(e.target.files)
                                            }
                                            type="file"
                                            className="h-full w-full opacity-0 hover:cursor-pointer"
                                            name="voucher"
                                          />
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="font-bold py-4 px-4 border-b border-grey-light">
                                {"Total"}
                              </td>
                              <td className="font-bold py-4 px-4 border-b border-grey-light text-right">
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

                        <div className="h-10 flex justify-center items-end">
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
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-8 items-center">
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
