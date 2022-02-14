/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ExclamationIcon } from "@heroicons/react/outline"
import Button from "components/Button"

const selectedBills = [
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
  { id: 0, label: "Total: ", total: "400000" },
]

/**
 * modal que se muestra al realizar alguna accion, se abre en base a la variable isOpen, y ejecuta cierta accion
 * cuando se cierra con la funcion onClose
 */
export default function ActionModal({ isOpen, onClose }) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
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
                      Notificar pagos de facturas a PuertoX
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Estas seguro(a) de enviar a notificar el pago de las
                        siguientes facturas a Puerto X?
                      </p>
                    </div>
                    <div>
                      <div className="bg-white rounded my-6">
                        <table className="text-left w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                RUT Emisor
                              </th>
                              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                Folio
                              </th>
                              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                Monto
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedBills.map((bill) => {
                              return (
                                <tr
                                  key={bill.id}
                                  className="hover:bg-grey-lighter"
                                >
                                  <td className="py-4 px-6 border-b border-grey-light">
                                    {bill.rut_emisor}
                                  </td>
                                  {bill.id === 0 ? (
                                    <>
                                      <td className="font-bold py-4 px-6 border-b border-grey-light">
                                        {bill.label}
                                      </td>
                                      <td className="font-bold py-4 px-6 border-b border-grey-light">
                                        {bill.total}
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="py-4 px-6 border-b border-grey-light">
                                        {bill.folio}
                                      </td>
                                      <td className="py-4 px-6 border-b border-grey-light">
                                        {bill.monto_factura}
                                      </td>
                                    </>
                                  )}
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-8">
                <Button text="Enviar" color="red" onClick={onClose} />
                <Button text="Cancelar" color="blue" onClick={onClose} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
