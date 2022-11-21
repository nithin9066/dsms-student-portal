import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Select from "../components/Select";

function Register() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const [schoolList, setschoolList] = useState([]);
    const [GenderList, setGenderList] = useState([]);
    const [LicenseTypeList, setLicenseTypeList] = useState([]);
    const [SubLicenseTypeList, setSubLicenseTypeList] = useState([]);
    const [SubLicenseLevel1List, setSubLicenseLavel1List] = useState([]);
    const [SubLicenseLevel2List, setSubLicenseLavel2List] = useState([]);
    const [SubLicenseLevel3List, setSubLicenseLavel3List] = useState([]);
    const [Plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const [license, setLicense] = useState(
        {
            license_type_id: '',
            sub_license_id: '',
            sub_license_lv1_id: '',
            sub_license_lv2_id: '',
            sub_license_lv3_id: ''
        }
    )


    const idType = [
        { id: 0, name: "Aadhar" },
        { id: 1, name: "PAN" },
        { id: 2, name: "License" },
        { id: 3, name: "Passport" },

    ]
    const levels = [
        { id: 1, name: "Beginner" },
        { id: 2, name: "Intermediate" },
        { id: 3, name: "Expert" },

    ]
    useEffect(() => {
        axios({
            method: "GET",
            url: "https://dsms.mentrictech.in/backend/api/auth/all_schools_list",

        }).then(({ data }) => {
            setschoolList(data.data.result)
        }).catch((error) => {
            console.log(error);
        })
        axios({
            method: "GET",
            url: "https://dsms.mentrictech.in/backend/api/auth/list_gender",

        }).then(({ data }) => {
            setGenderList(data.data.result)
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    const getLicenseTypes = (e) => {
        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/school_licenses/${getValues('school_id')}/${e.target.value}`,

        }).then(({ data }) => {
            setLicenseTypeList(data.data.result)
        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicense = (e) => {
        setLicense((license) => ({
            ...license,
            ...{
                license_type_id: e.target.value
            }
        }));
        axios({
            method: "POST",
            url: "https://dsms.mentrictech.in/backend/api/auth/category_tab_licenses",
            data: {
                license_id: e.target.value
            }
        }).then(({ data }) => {
            setSubLicenseTypeList(data.data.result[0].data ? data.data.result[0].data : [])
        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicenseL1 = (e) => {
        setLicense((license) => ({
            ...license,
            ...{
                sub_license_id: e.target.value
            }
        }));
        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/sub_license_list_lv_one_home/${e.target.value}`,
        }).then(({ data }) => {
            setSubLicenseLavel1List(data.data.result.sub_license_lv1)
        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicenseL2 = (e) => {
        setLicense((license) => ({
            ...license,
            ...{
                sub_license_lv1_id: e.target.value
            }
        }));

        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/sub_license_list_lv_two_home/${e.target.value}`,
        }).then(({ data }) => {
            setSubLicenseLavel2List(data.data.result.sub_license_lv2)
        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicenseL3 = (e) => {
        setLicense((license) => ({
            ...license,
            ...{
                sub_license_lv2_id: e.target.value
            }
        }));

        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/sub_license_list_lv_three_home/${e.target.value}`,
        }).then(({ data }) => {
            setSubLicenseLavel3List(data.data.result.sub_license_lv3)
        }).catch((error) => {
            console.log(error);
        })
    }
    const getPlans = (e) => {

        axios({
            method: "POST",
            url: `https://dsms.mentrictech.in/backend/api/auth/get_subscriptionplans_home`,
            data: {
                level_id: getValues('level_id'),
                license_type_id: license.license_type_id,
                school_id: getValues('school_id'),
                sub_license_id: license.sub_license_id,
                sub_license_lv1_id: license.sub_license_lv1_id,
                sub_license_lv2_id: license.sub_license_lv2_id,
                sub_license_lv3_id: license.sub_license_lv3_id,
            }
        }).then(({ data }) => {
            setPlans(data.data.result)
        }).catch((error) => {
            console.log(error);
        })
    }
    const StudentRegister = (formData) => {
        console.warn(formData);
        axios({
            method: "POST",
            url: `https://dsms.mentrictech.in/backend/api/auth/student_register`,
            data: formData
        }).then(({ data }) => {
            console.log(data);
            navigate(`/otp-verification/${data.data.result.id}/${data.data.result.username}`)
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="bg-slate-200 flex justify-center items-center">
            <form onSubmit={handleSubmit(StudentRegister)} className="p-5 bg-white drop-shadow-xl rounded-lg space-y-1 grid grid-cols-2 gap-5 my-5">
                <h1 className="text-3xl uppercase font-bold">Student Registration</h1>
                <Select className="col-span-2" List={schoolList} label={"Select School"} name={register('school_id', { required: true })} />
                <Input name={register('first_name_english', { required: true })} label={'First Name(English)'} />
                <Input name={register('second_name_english', { required: true })} label={'Last Name(English)'} />
                <Input name={register('first_name_arabic', { required: true })} label={'First Name(Arabic)'} />
                <Input name={register('second_name_arabic', { required: true })} label={'Last Name(Arabic)'} />
                <Input name={register('family_name_english', { required: true })} label={'Family Name(English)'} />
                <Input name={register('family_name_arabic', { required: true })} label={'Family Name(Arabic)'} />
                <Input name={register('province', { required: true })} label={'Province'} />
                <Input name={register('city', { required: true })} label={'City'} />
                <Input name={register('email', { required: true })} label={'Email'} />
                <div className="flex items-center gap-2">
                    <Select className="rounded-none" name={register('select', { required: true })} label={'Country Code'} List={[{ id: 0, name: "+966" }, { id: 1, name: "+967" }, { id: 2, name: "+968" }]} />
                    <Input className="" label={'Mobile Number'} name={register('mobile', { required: true })} />
                </div>
                <Input name={register('dob', { required: true })} label={'Date of Birth'} type="date" />
                <Select callback={getLicenseTypes} name={register('gender', { required: true })} label={'Gender'} List={GenderList} />
                <Select name={register('id_type', { required: true })} label={'ID Type'} List={idType} />
                <Input name={register('username', { required: true })} label={'Username'} />
                <Input name={register('id_number', { required: true })} label={'ID No'} />
                <Select callback={getSubLicense} label={'License Type'} List={LicenseTypeList} />
                <Select callback={getSubLicenseL1} label={'Sub License Type'} List={SubLicenseTypeList} />
                <Select callback={getSubLicenseL2} label={'Sub License Level 1'} List={SubLicenseLevel1List} />
                <Select callback={getSubLicenseL3} label={'Sub License Level 2'} List={SubLicenseLevel2List} />
                <Select callback={(e) => setLicense((license) => ({ ...license, ...{ sub_license_lv3_id: e.target.value } }))} label={'Sub License Level 3'} List={SubLicenseLevel3List} />
                <Input name={register('password', { required: true })} label={'Password'} type={'password'} />
                <Input name={register('confirm_password', { required: true })} label={'Confirm Password'} type={'password'} />
                <Select callback={getPlans} name={register('level', { required: true })} label={'Sub License Level 3'} List={levels} />
                <Select name={register('subscription_id', { required: true })} label={'Plan'} List={Plans} />
                <div className="col-span-2 text-center">
                    <button className="bg-black text-white/90 px-3 py-2 w-1/4 rounded-lg font-bold">Register</button>
                </div>
                <div>
                    <Link className="font-medium text-xs" to={'/'}>Already Have an Account? <span className="text-blue-800 ">Sign In here</span></Link>
                </div>
            </form>
        </div>
    );
}

export default Register;