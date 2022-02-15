import { utils, write, writeFile } from "xlsx"

export default function exportExcel(fileName, data) {
  // libro de excel
  const workBook = utils.book_new()

  // recorrer datos

  try {
    // formatear los datos
    data.map((row) => {
      delete row.id // borrar la columna id, en excel no tiene utilidad
      Object.keys(row).forEach((key) => {
        // elimina puntos para comprobar si el valor actual es numerico
        const tmp = typeof row[key] === "string" && row[key].replace(/\./g, "")
        const isNum = /^\d+$/.test(tmp) // regex para saber si hay solo digitos
        if (isNum) {
          // si el valor actual es numerico se castea a int para que se pueda sumar en excel
          row[key] = parseInt(tmp)
        }

        if (row[key] === "NaN") {
          // si el valor es NaN se reemplaza con 0, significa que no hay dato
          row[key] = "0"
        }
      })
      return row
    })

    // definir ancho de columna automatico
    let objectMaxLength = []
    for (let i = 0; i < data.length; i++) {
      let value = Object.values(data[i])
      for (let j = 0; j < value.length; j++) {
        if (typeof value[j] == "number") {
          objectMaxLength[j] = 12
        } else if (
          value[j] === null ||
          value[j] === undefined ||
          value[j] === ""
        ) {
          objectMaxLength[j] = 10
        } else {
          // largo minimo 5
          if (value[j].length < 5) {
            objectMaxLength[j] = 5
          } else {
            objectMaxLength[j] =
              objectMaxLength[j] >= value[j].length
                ? objectMaxLength[j]
                : value[j].length
          }
        }
      }
    }

    // array de anchos de cada columna
    const widthCols = objectMaxLength.map((value, j) => {
      return { width: objectMaxLength[j] }
    })

    // el titulo de la hoja no puede superar 31 caracteres: limitacion de la libreria
    const sheetName = String("facturas PuertoX")
    const workSheet = utils.json_to_sheet(data)
    workSheet["!cols"] = widthCols
    utils.book_append_sheet(workBook, workSheet, sheetName)
  } catch (error) {
    console.log("exportExcel.js " + error)
  }

  let buf = write(workBook, { bookType: "xlsx", type: "buffer" })
  write(workBook, { bookType: "xlsx", type: "binary" })
  writeFile(workBook, `${fileName}.xlsx`)
}
