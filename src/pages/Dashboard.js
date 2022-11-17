import axios from "axios";
import { useEffect } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function Dashboard() {
  
    return ( 
        <div className="grid grid-cols-12 h-screen">
            <SideMenu />
            <div className="col-span-9 bg-purple-100">
            <Header />
            </div>
        </div>
     );
}

export default Dashboard;