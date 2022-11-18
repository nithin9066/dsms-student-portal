import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [poption, setpoption] = useState(false)
    useEffect(()=>{
        document.body.addEventListener('click', ()=>{
            setpoption(false)
        })
    },[])

    return (
        <div className="bg-black text-white px-4 py-3 fixed w-full left-0">
            <div className="flex justify-between items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white bg-black">Student Portal</h1>
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                        <button onClick={(event) => {event.stopPropagation(); setpoption(!poption)}}><Icon className="text-4xl" icon="mdi:user-circle" /></button>
                        {
                            poption ?
                                <div className="absolute bg-white shadow-md z-50 text-black rounded-md translate-y-14 -translate-x-5">
                                    <div className="font-medium flex flex-col">
                                        <Link className="hover:bg-black/10 px-5 py-1.5" to={'/profile'}>Profile</Link>
                                        <Link className="hover:bg-black/10 px-5 py-1.5" to={'/logout'}>Logout</Link>
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                    <h2 className="font-medium capitalize">{sessionStorage.getItem('user_name')}</h2>
                </div>
            </div>
        </div>
    );
}

export default Header;