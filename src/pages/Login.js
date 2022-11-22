import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import Loading from "../components/Loading";


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldUseNativeValidation: true })
    const [schoolList, setschoolList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const submitBtn = useRef();
    useEffect(() => {
        console.log(location.state);
        setLoading(true)
        axios({
            method: "GET",
            url: "https://dsms.mentrictech.in/backend/api/auth/all_schools_list",

        }).then(({ data }) => {
            setschoolList(data.data.result)
            setLoading(false)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const loginHandler = (formdata) => {
        console.log(errors);
        submitBtn.current.innerHTML = "Loading . . . ."
        axios({
            method: 'POST',
            url: "https://dsms.mentrictech.in/backend/api/auth/student_login",
            data: formdata,
        }).then(({ data }) => {
            submitBtn.current.innerHTML = "Login"
            if (data.errors) {
                Alert("error", data.data.message)
            }
            else {
                sessionStorage.setItem('user_id', data.data.result.userdata.id)
                sessionStorage.setItem('user_name', data.data.result.userdata.name)
                sessionStorage.setItem('user', JSON.stringify(data.data.result))
                console.log(formdata.school_id);
                sessionStorage.setItem('school_id', formdata.school_id)
                Alert("success", data.data.message)
                setTimeout(() => {
                    // navigate(location.state ? location.state.from.pathname : '/schedules')
                    navigate('/schedules')
                }, 1000)

            }
        }).catch(({ response }) => {
            console.log("error", response);
            Alert("error", response.data.data.message)
            submitBtn.current.innerHTML = "Login"

        })
    }
    return (
        <>
        <Loading isloading={loading} />
            <div className="h-screen bg-slate-300 flex justify-center items-center">
                <div className="bg-white rounded-xl lg:p-10 px-3 py-5 drop-shadow-md">
                    <h1 className="text-2xl text-black font-extrabold mb-7 uppercase">Student Login</h1>
                    <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">School</label>
                            <select {...register('school_id', { required: true })} className="border border-black/30 rounded-md p-2">
                                <option>Select School</option>
                                {
                                    schoolList.map((item, inx) => <option key={inx} value={item.id}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Email</label>
                            <input type={'text'} {...register('email', { required: true })} className="border border-black/30 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Password</label>
                            <input type={'password'} {...register('password', { required: true })} className="border border-black/30 rounded-md p-2" />
                        </div>
                        <div>
                            <button ref={submitBtn} className="w-full bg-black text-white font-medium p-2 rounded-md">Login</button>
                        </div>
                        <div>
                            <Link className="font-medium text-sm" to={'/register'}>Don’t Have Account? <span className="text-blue-800 ">Sign up here</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;