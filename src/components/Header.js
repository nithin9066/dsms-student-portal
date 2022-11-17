import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Header() {

    return (
        <div className="bg-purple-800 text-white px-4 py-3">
            <div className="flex justify-end items-center gap-2">
                <Link to={'/profile'}>
                <Icon className="text-4xl" icon="mdi:user-circle" />
                </Link>
                <h2 className="font-medium capitalize">{sessionStorage.getItem('user_name')}</h2>
            </div>
        </div>
    );
}

export default Header;