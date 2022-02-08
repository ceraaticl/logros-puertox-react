import Input from "@material-tailwind/react/Input"
import Button from "components/Button/index.js"
import Select from "components/Select"
import { criterionList, statusList, docTypeList } from "./filters.js"

export default function Search() {
  return (
    <div className="w-5/6 mx-auto h-48 mt-4 bg-white p-5 rounded-lg shadow-md grid grid-rows-2 grid-flow-col gap-8">
      <div className="grid grid-cols-4 gap-8 items-end">
        <div className="">
          <h1 className="text-xl text-red-600">Consulta Masiva</h1>
          <Select label="Criterio" options={criterionList} />
        </div>
        <div className="mr-3">
          <Select label="Estado" options={statusList} />
        </div>
        <div className="ml-3 grid grid-rows-2">
          <h1 className="text-xl self-start col-span-2 text-red-600">
            Consulta Individual
          </h1>
          <div className="col-span-2">
            <Input type="text" placeholder="Rut Emisor" color="red" />
          </div>
        </div>
        <div>
          <Input type="text" placeholder="Folio" color="red" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 items-end mb-2">
        <div>
          <Input
            type="date"
            color="red"
            size="regular"
            outline={false}
            placeholder="Desde"
          />
        </div>
        <div className="mr-3">
          <Input
            type="date"
            color="red"
            size="regular"
            outline={false}
            placeholder="Hasta"
          />
        </div>
        <div className="ml-3">
          <Select label="DTE" options={docTypeList} />
        </div>
        <div>
          <Button color="red" text="Consultar" />
        </div>
      </div>
    </div>
  )
}
