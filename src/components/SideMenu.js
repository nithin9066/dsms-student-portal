import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";

function SideMenu() {
    const loaction = useLocation();
    const [nav, setNav] = useState('')
    const active = "bg-black rounded-md drop-shadow-lg text-white font-extrabold translate-x-2";
    useEffect(()=>{
        setNav((loaction.pathname).split('/')[1])
    },[])
    return (
        <>
        <Header />
        <div className="col-span-3 bg-white/80 text-black/70 mt-16">
            <ul className="p-3 pr-0 space-y-3 font-bold text-lg tracking-wider">
                {/* <li className={`${nav === 'dashboard' ? active : ''} px-4 py-2.5`}><Link to={'/dashboard'}>DASHBOARD</Link></li> */}
                <li className={`${nav === 'schedules' ? active : 'hover:bg-black/5 hover:rounded-lg translate-x-2'} px-4 py-2.5`}><Link to={'/schedules'}><div>SCHEDULES</div></Link></li>
                <li className={`${nav === 'confirm-schedules' ? active : 'hover:bg-black/5 hover:rounded-lg translate-x-2'} px-4 py-2.5`}><Link className="w-full" to={'/confirm-schedules'}><div>CONFIRMED SCHEDULES</div></Link></li>
                {/* <li className={` ${nav === 'invoices' ? active : ''} px-4 py-2.5`}><Link to={'/invoices'}>INVOICES</Link></li> */}
            </ul>
        </div>
        </>
    );
}

export default SideMenu;