import { Alert } from "../components/Alert";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OtpVeification() {
    const { user_id, username } = useParams();
    const navigate = useNavigate();
    let inputs;
    useEffect(() => {
        inputs = document.querySelectorAll('input')
        console.log(inputs.length);
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('input', function (e) {
                const z = parseInt(e.target.attributes[0].nodeValue)
                
                if (z !== (inputs.length - 1)) {
                    inputs[z + 1].focus()
                }
            })
            inputs[i].addEventListener('keydown', function (e) {
                console.log(e);
                if (e.key === "Backspace") {
                    e.preventDefault();
                    e.target.value = ''
                    var z = parseInt(e.target.attributes[0].nodeValue)
                    console.log(z);
                    inputs[z - 1].focus()
                }
            })
        }
    }, [])

    const verify = () => {
        let otp_code = '';
        const inputs = document.querySelectorAll('input')
        inputs.forEach((input) =>{
            otp_code += input.value
        })
        console.log(otp_code);
        axios({
            method: "POST",
            url: `https://dsms.mentrictech.in/backend/api/auth/otp_verfiy`,
            data: {
                user_id: parseInt(user_id),
                username,
                otp_code 
            }
        }).then(({data}) => {
            console.log(data.data.message);
            Alert('success', data.data.message)
            setTimeout(()=>{
                navigate('/')
            },1000)
            
        }).catch(({response}) => {
            if(response.data.errors)
            {
                Alert('error', response.data.data.message)
            }
            console.log(response);
        })
    }
    return (
        <div className="bg-slate-200 flex justify-center items-center h-screen">
            <div className="bg-white p-10 space-x-3 rounded-lg text-center">
                <div className="mb-5 space-y-2">
                    <h1 className="text-2xl font-bold uppercase">Verification</h1>
                    <p className="text-sm">Please enter the Code recieved in your Mobile/Email</p>
                </div>
                <input data={0} autoFocus className="border border-black/50 text-center text-xl p-2 w-14 h-14 rounded-lg" type={'text'} maxLength='1' />
                <input data={1} className="border border-black/50 text-center text-xl p-2 w-14 h-14 rounded-lg" type={'text'} maxLength='1' />
                <input data={2} className="border border-black/50 text-center text-xl p-2 w-14 h-14 rounded-lg" type={'text'} maxLength='1' />
                <input data={3} className="border border-black/50 text-center text-xl p-2 w-14 h-14 rounded-lg" type={'text'} maxLength='1' />
                <div className="mt-7 flex flex-col">
                    <button onClick={verify} className="px-3 py-2 bg-black text-white rounded-lg font-bold">Verify</button>
                    <button className="py-4 text-black/70 font-bold hover:text-blue-900">Resend</button>
                </div>
            </div>
        </div>
    );
}

export default OtpVeification;