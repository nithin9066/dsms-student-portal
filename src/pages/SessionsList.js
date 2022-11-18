import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { url } from '../AppURL';
import Moment from 'react-moment';
import { Icon } from "@iconify/react";

function SessionsList() {
    const { group_id } = useParams();
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: "GET",
            url: `${url}schedule/show/${group_id}`

        }).then(({ data }) => {
            console.log(data.data.result.sessions);
            setSessions(data.data.result.sessions)
        })
    },[])
    return (
        <div className="grid grid-cols-12 h-screen">
            <SideMenu />
            <div className="col-span-9 bg-black/5 mt-14 p-7">
            <button className="flex justify-between items-center" onClick={()=>navigate('/confirm-schedules')}>
            <Icon className="bg-black text-white text-4xl p-1.5 rounded-full" icon="material-symbols:arrow-back-rounded" />
            </button>
                <div className="px-5 pt-2 pb-5 mt-6 bg-white/90 rounded-xl">
                    <table className="w-full overflow-auto">
                        <thead className="text-black font-bold text-center uppercase">
                            <tr>
                                <td className="p-4">Date</td>
                                <td className="p-4">Start Time</td>
                                <td className="p-4">End Time</td>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                sessions.map((item, inx) => {
                                    return (
                                        <tr key={inx} className="odd:bg-black/5 font-medium text-black">
                                            <td className="p-2 rounded-l-lg"><Moment format="DD-MM-YYYY">{item.start_time}</Moment></td>
                                            <td className="p-2"><Moment format="hh:mm a">{item.start_time}</Moment></td>
                                            <td className="p-2 rounded-r-lg"><Moment format="hh:mm a">{item.end_time}</Moment></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SessionsList;