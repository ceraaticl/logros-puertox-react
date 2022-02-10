import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import axios from "axios"

// en este index inicia todo
// definicion de url y header para todas las llamadas a la api
axios.defaults.baseURL = process.env.REACT_APP_API_PUERTOX
axios.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
}

ReactDOM.render(<App />, document.getElementById("root"))
