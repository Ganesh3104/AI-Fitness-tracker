
import { Outlet } from "react-router-dom"
import BottomNav from "../components/BottomNav"
import Sidebar from "../components/Siderbar"


const Layout = () => {
    return (
        <div className="layout-container">
            <Sidebar/>
            <div className="flex-1 overflow-y-scroll">
                <Outlet/>
            </div>
           <BottomNav/>
        </div>
    )
}

export default Layout