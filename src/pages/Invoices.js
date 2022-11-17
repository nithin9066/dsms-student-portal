import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function Invoices() {
    return ( 
        <div className="grid grid-cols-12 h-screen">
            <SideMenu />
            <div className="col-span-9 bg-purple-100">
            <Header />
            </div>
        </div>
     );
}

export default Invoices;