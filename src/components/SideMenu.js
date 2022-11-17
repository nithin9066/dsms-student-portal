import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SideMenu() {
    const loaction = useLocation();
    const [nav, setNav] = useState('')
    const active = "bg-white rounded-l-3xl text-purple-600 font-extrabold";
    useEffect(()=>{
        setNav((loaction.pathname).split('/')[1])
    },[])
    return (
        <div className="col-span-3 bg-purple-700 text-white/70">
            <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white/70 mb-5 bg-purple-800 p-3">Student Portal</h1>
            <ul className="p-3 pr-0 space-y-3 font-medium text-lg tracking-wider">
                {/* <li className={`${nav === 'dashboard' ? active : ''} px-4 py-2.5`}><Link to={'/dashboard'}>DASHBOARD</Link></li> */}
                <li className={`${nav === 'sessions' ? active : ''} px-4 py-2.5`}><Link to={'/sessions'}>SESSIONS & EXAMS</Link></li>
                <li className={`${nav === 'confirm-schedules' ? active : ''} px-4 py-2.5`}><Link to={'/confirm-schedules'}>CONFIRMED SCHEDULES</Link></li>
                {/* <li className={` ${nav === 'invoices' ? active : ''} px-4 py-2.5`}><Link to={'/invoices'}>INVOICES</Link></li> */}
            </ul>
        </div>
    );
}

export default SideMenu;