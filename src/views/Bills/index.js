import Search from "components/Search"
import Table from "components/Table"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Bills() {
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="flex-col">
      <div className="flex-none">
        <Search />
      </div>
      <div className="flex grow">
        <Table />
      </div>
    </div>
  )
}
