import "./App.css"
import "@material-tailwind/react/tailwind.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "views/Login"
import Bills from "views/Bills"
import Navbar from "components/Navbar"

function App() {
  console.log(localStorage.token)
  return (
    <div className="App sans h-screen flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/facturas" element={<Bills />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
