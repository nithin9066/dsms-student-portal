import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { url } from '../AppURL';
import Moment from 'react-moment';

function SessionsList() {
    const { group_id } = useParams();
    const [sessions, setSessions] = useState([]);
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
            <div className="col-span-9 bg-purple-100">
                <Header />
                <div className="p-5">
                    <table className="w-full overflow-auto">
                        <thead className="bg-purple-700 text-white/70 font-bold text-center uppercase">
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
                                        <tr key={inx} className="odd:bg-purple-200 font-medium text-indigo-900">
                                            <td className="p-2"><Moment format="DD-MM-YYYY">{item.start_time}</Moment></td>
                                            <td className="p-2"><Moment format="hh:mm a">{item.start_time}</Moment></td>
                                            <td className="p-2"><Moment format="hh:mm a">{item.end_time}</Moment></td>
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