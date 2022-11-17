import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function ConfirmSchedules() {
    const studentInfo = JSON.parse(sessionStorage.getItem('user')).student_info;
    const [confirmList, setConfirmList] = useState(null);
    useEffect(() => {
        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/get_confirmed_schedules/${studentInfo.id}`
        }).then(({ data }) => {
            data = data.data.result;
            setConfirmList(data)
            console.log(data);
        })
    }, [])
    return (
        <>
            <div className="grid grid-cols-12 h-screen">
                <SideMenu />
                <div className="col-span-9 bg-purple-100">
                    <Header />
                    {
                        confirmList !== null ? confirmList.length > 0 ?
                            <div className="p-5">
                                <table className="w-full overflow-auto">
                                    <thead className="bg-purple-700 text-white/70 font-bold text-center uppercase">
                                        <tr>
                                            <td className="p-4">Details</td>
                                            <td className="p-4">Total Seats</td>
                                            <td className="p-4">Seats Booked</td>
                                            <td className="p-4">Mode</td>
                                            <td className="p-4">Schedule Starts</td>
                                            <td className="p-4">Session Schedules</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            confirmList.map((item, inx) => {
                                                return (
                                                    <tr key={inx} className="odd:bg-purple-200 font-medium text-indigo-900">
                                                        <td className="p-2">{item.name_en}</td>
                                                        <td className="p-2">{item.session_capacity}</td>
                                                        <td className="p-2">{item.total_confirmation}</td>
                                                        <td className="p-2">{item.mode_of_learning}</td>
                                                        <td className="p-2">{item.start_time}</td>
                                                        <td className="p-2" title="View Sessions"><Link to={`/confirm-schedules/${item.schedule_group}`}><Icon className="text-purple-700 text-3xl m-auto" icon="ic:baseline-remove-red-eye" /></Link></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            : <div className="text-4xl font-extrabold text-purple-500 flex justify-center items-center h-4/5">No Confirm Schedules Found!</div>
                            : ''
                    }
                </div>
            </div>
        </>
    );
}

export default ConfirmSchedules;