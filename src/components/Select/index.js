import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import Icon from "@material-tailwind/react/Icon"

const people = [
  {
    id: 1,
    name: "Fecha Ingreso",
  },
  {
    id: 2,
    name: "Fecha Vcto PuertoX",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Select({ label, options }) {
  const [selected, setSelected] = useState(options[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-1 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Icon name="expand" size="lg" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options &&
                  options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-red-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block"
                              )}
                            >
                              {option.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-red-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <Icon name="check" size="lg" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
