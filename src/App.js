import "./App.css"
import "@material-tailwind/react/tailwind.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "views/Login"
import Bills from "views/Bills"
import Navbar from "components/Navbar"
import { useState } from "react"

function App() {
  const [user, setUser] = useState()

  return (
    <div className="App sans min-h-screen flex flex-col">
      <Router basename="/nicolas/LogrosPuertoX/web">
        <Navbar user={user} />
        <Routes>
          <Route exact path="/" element={<Login setUser={setUser} />} />
          <Route exact path="/facturas" element={<Bills user={user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
