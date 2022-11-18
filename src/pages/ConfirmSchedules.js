import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Confirm } from "../components/ConfirmAlert";
import SideMenu from "../components/SideMenu";

function ConfirmSchedules() {
    const studentInfo = JSON.parse(sessionStorage.getItem('user')).student_info;
    const [confirmList, setConfirmList] = useState(null);
    const [didUpdate, setUpdate] = useState(false)

    useEffect(() => {
        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/get_confirmed_schedules/${studentInfo.id}`
        }).then(({ data }) => {
            data = data.data.result;
            setConfirmList(data)
            console.log(data);
        })
    }, [didUpdate])

    const cancelSchedule = (schedule_id) => {

            axios({
                method: "GET",
                url: `https://dsms.mentrictech.in/backend/api/auth/on_click_of_schedule_cancel/${schedule_id}`,
            }).then(({data}) => {
                Alert("success", data.message)
                setUpdate(!didUpdate)
            }).catch(({response}) => {
              
                Alert("error", "Someting Went Wrong!")
                console.error(response);
            })

        
    }
    
    return (
        <>
        
            <div className="grid grid-cols-12 h-screen bg-slate-200">
                <SideMenu />
                <div className="col-span-9 overflow-auto mt-16 p-5">
                    
                    {
                        confirmList !== null ? confirmList.length > 0 ?
                            <div className="p-5 bg-white/90 rounded-xl">
                                <table className="w-full overflow-auto">
                                    <thead className="text-black font-bold text-center uppercase">
                                        <tr>
                                            <td className="px-4 pb-5">Name</td>
                                            {/* <td className="px-4 pb-5">Total Slots</td> */}
                                            <td className="px-4 pb-5">Slots confirmed</td>
                                            <td className="px-4 pb-5">Mode</td>
                                            <td className="px-4 pb-5">Starts At</td>
                                            <td className="px-4 pb-5">Session Schedules</td>
                                            <td className="px-4 pb-5">Cancel Schedule</td>

                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            confirmList.map((item, inx) => {
                                                return (
                                                    <tr key={inx} className="odd:bg-black/5 font-medium text-black">
                                                        <td className="p-2 rounded-l-md">{item.name_en}</td>
                                                        {/* <td className="p-2 ">{item.session_capacity}</td> */}
                                                        <td className="p-2 ">{item.total_confirmation}</td>
                                                        <td className="p-2 ">{item.mode_of_learning}</td>
                                                        <td className="p-2"><Moment format="DD-MM-YYYY | hh:mm a">{item.start_time}</Moment></td>
                                                        <td className="p-2 rounded-r-md" title="View Sessions">
                                                            <Link to={`/confirm-schedules/${item.schedule_group}`}>
                                                                <Icon className="text-black text-3xl m-auto font-extrabold" icon="carbon:event-schedule" />
                                                            </Link>
                                                        </td>
                                                        <td className="p-2"><button className="bg-red-400 text-white/90 px-2 py-1 rounded-md" title="Cancel Schedule" onClick={() => Confirm("cancel", "You want to cancel the schedule?",() => cancelSchedule(item.id))}>Cancel</button></td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            : <div className="text-3xl font-extrabold text-black/50 flex justify-center items-center h-4/5">You have not confirmed any schedules!</div>
                            : ''
                    }
                </div>
            </div>
        </>
    );
}

export default ConfirmSchedules;