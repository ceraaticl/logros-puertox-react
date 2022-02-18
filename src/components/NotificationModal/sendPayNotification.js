import axios from "axios"

/**
 * el cliente no puede obtener el archivo directamente, asi que se convierte en base 64 y
 * se envia al servidor, luego el servidor decodifica y toma el archivo para enviarlo por
 * ftp al servidor web
 */

// funcion que convierte un archivo a b64
const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = ""
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      baseURL = reader.result
      resolve(baseURL)
    }
  })
}

export default async function sendPayNotification(data) {
  const voucher = data.voucher
  const voucherB64 = await getBase64(voucher)
  const notifyParams = {
    amount: data.totalAmount,
    payDate: data.payDate.toISOString().split("T")[0],
    bills: data.billsToNotify,
    voucher: voucherB64,
  }

  try {
    const billResponse = await axios.post("facturas/notificar", notifyParams)
    return { ...billResponse.data, status: billResponse.status }
  } catch (error) {
    console.log(error)
    return {
      error: error.response.data.message,
      status: error.response.status,
    }
  }
}
