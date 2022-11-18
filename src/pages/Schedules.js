import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Alert } from "../components/Alert";
import { Confirm } from "../components/ConfirmAlert";
import SideMenu from "../components/SideMenu";

function Schedules() {
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

            axios({
                method: "GET",
                url: `https://dsms.mentrictech.in/backend/api/auth/on_click_of_schedule/${schedule_id}`,
            }).then(({data}) => {
                console.log(data.data.message);
                data.data.success ? Alert("success", data.data.message) : Alert("error", data.data.message)
                setUpdate(!didUpdate)
            }).catch(error => {
                alert("Someting Went Wrong!")
            })
   }
    return (
        <div className="grid grid-cols-12 h-screen ">
            <SideMenu />
            <div className="col-span-9 bg-slate-200 overflow-auto mt-14 p-5">
                {
                   plans !== null ? plans.length > 0 ?

                        <div className="p-5 bg-white/80 rounded-xl">
                            <table className="w-full overflow-auto">
                                <thead className="font-bold text-center uppercase">
                                    <tr>
                                        <td className="px-2 pt-2 pb-4">Name</td>
                                        <td className="px-2 pt-2 pb-4">Available Slots</td>
                                        <td className="px-2 pt-2 pb-4">Mode</td>
                                        <td className="px-2 pt-2 pb-4">Starts At</td>
                                        <td className="px-2 pt-2 pb-4">Action</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        plans.map((item, inx) => {
                                            return (
                                                <tr key={inx} className="odd:bg-black/5 font-medium text-balck">
                                                    <td className="p-2 rounded-l-lg">{item.name_en}</td>
                                                    <td className="p-2">{item.session_capacity - item.total_confirmation}</td>
                                                    <td className="p-2">{item.mode_of_learning}</td>
                                                    <td className="p-2"><Moment format="DD-MM-YYYY | hh:mm a">{item.start_time}</Moment></td>
                                                    <td className="p-2 rounded-r-lg flex items-center justify-center" title="Confirm Session"><button className="bg-black px-2 py-1 text-white rounded-md" onClick={() => Confirm("confirm","Are you sure you want to confirm the schedule?", ()=> addSchedule(item.id))}>Confirm</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        : <div className="text-4xl font-extrabold text-black/50 flex justify-center items-center h-4/5">No Schedules Found!</div>
                    : ''
                }
            </div>
        </div>
    );
}

export default Schedules;