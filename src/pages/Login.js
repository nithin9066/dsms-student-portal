import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

function Login() {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const [schoolList, setschoolList] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios({
            method: "GET",
            url: "https://dsms.mentrictech.in/backend/api/auth/all_schools_list",
            
        }).then(({data})=>{
            setschoolList(data.data.result)
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const loginHandler = (formdata) =>{
        console.log(formdata);
        axios({
            method: 'POST',
            url: "https://dsms.mentrictech.in/backend/api/auth/student_login",
            data: formdata,
        }).then(({data}) =>{
            console.log(data.data.result);
            sessionStorage.setItem('user_id', data.data.result.userdata.id)
            sessionStorage.setItem('user_name', data.data.result.userdata.name)

            sessionStorage.setItem('user', JSON.stringify(data.data.result))
            console.log(formdata.school_id);
            sessionStorage.setItem('school_id', formdata.school_id)
            Alert("success", data.data.message)
            setTimeout(() => {
                navigate('/sessions')
            },1000)
        }).catch((error) =>{
            console.log("error",error);
        })
    }
    return (
        <div className="h-screen bg-slate-300 flex justify-center items-center">

            <div className="bg-white rounded-xl px-20 py-10 shadow-lg">
                <h1 className="text-2xl text-blue-700 font-bold mb-7">Student School</h1>
                <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">School</label>
                        <select {...register('school_id')} className="border border-black/30 rounded-md p-2">
                            <option>Select School</option>
                            {
                                schoolList.map((item,inx)=> <option key={inx} value={item.id}>{item.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Email</label>
                        <input type={'text'} {...register('email')} className="border border-black/30 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Password</label>
                        <input type={'password'} {...register('password')} className="border border-black/30 rounded-md p-2" />
                    </div>
                    <button className="w-full bg-blue-600 text-white font-medium p-2 rounded-md">Login</button>
                </form>
            </div>

        </div>
    );
}

export default Login;