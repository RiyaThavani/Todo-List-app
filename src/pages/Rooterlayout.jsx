import { Outlet } from "react-router-dom"
import Navbar from "../componetes/Navbar"

const Rooterlayout = () => {
  return (
    <div>
       <Navbar/>
       <Outlet/>
    </div>
  )
}

export default Rooterlayout
