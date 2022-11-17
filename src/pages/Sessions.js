import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "../components/Alert";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function Sessions() {
    const studentInfo = JSON.parse(sessionStorage.getItem('user')).student_info;
    const [plans, setPlans] = useState(null);
    const [didUpdate, setUpdate] = useState(false)
    useEffect(() => {
        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/get_mainplan_schedules/${sessionStorage.getItem('school_id')}/${studentInfo.id}`,
        }).then(({ data }) => {
            console.log(data.data.result);
            setPlans(data.data.result);
        }).catch(error => {
            alert("Someting Went Wrong!")
        })
    }, [didUpdate])

    const addSchedule = (schedule_id) => {
        if(window.confirm("Are You Sure ?") == true)
        {
            axios({
                method: "GET",
                url: `https://dsms.mentrictech.in/backend/api/auth/on_click_of_schedule/${schedule_id}`,
            }).then(({data}) => {
                console.log(data.data.message);
                Alert("success", data.data.message)
                setUpdate(!didUpdate)
            }).catch(error => {
                alert("Someting Went Wrong!")
            })
        }
        else
        return false;
    }
    return (
        <div className="grid grid-cols-12 h-screen ">
            <SideMenu />
            <div className="col-span-9 bg-purple-100 overflow-auto">
                <Header />
                {
                   plans !== null ? plans.length > 0 ?

                        <div className="p-5">
                            <table className="w-full overflow-auto">
                                <thead className="bg-purple-700 text-white/70 font-bold text-center uppercase">
                                    <tr>
                                        <td className="p-4">Details</td>
                                        <td className="p-4">Total Seats</td>
                                        <td className="p-4">Seats Booked</td>
                                        <td className="p-4">Mode</td>
                                        <td className="p-4">Schedule Starts</td>
                                        <td className="p-4">Action</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        plans.map((item, inx) => {
                                            return (
                                                <tr key={inx} className="odd:bg-purple-200 font-medium text-indigo-900">
                                                    <td className="p-2">{item.name_en}</td>
                                                    <td className="p-2">{item.session_capacity}</td>
                                                    <td className="p-2">{item.total_confirmation}</td>
                                                    <td className="p-2">{item.mode_of_learning}</td>
                                                    <td className="p-2">{item.start_time}</td>
                                                    <td className="p-2" title="Confirm Session"><button onClick={() => addSchedule(item.id)}><Icon className="text-purple-700 text-3xl m-auto" icon="material-symbols:add-circle" /></button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        : <div className="text-4xl font-extrabold text-purple-500 flex justify-center items-center h-4/5">No Schedules Found!</div>
                    : ''
                }
            </div>
        </div>
    );
}

export default Sessions;