import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import Input from "../components/Input";
import Select from "../components/Select";

function Register() {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ shouldFocusError: true, shouldUseNativeValidation: false })
    const [schoolList, setschoolList] = useState([]);
    const [GenderList, setGenderList] = useState([]);
    const [LicenseTypeList, setLicenseTypeList] = useState([]);
    const [SubLicenseTypeList, setSubLicenseTypeList] = useState([]);
    const [SubLicenseLevel1List, setSubLicenseLavel1List] = useState([]);
    const [SubLicenseLevel2List, setSubLicenseLavel2List] = useState([]);
    const [SubLicenseLevel3List, setSubLicenseLavel3List] = useState([]);
    const [Plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const schools = document.getElementById('school_id');

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
    console.log(errors);
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
        if (getValues('school_id') === undefined) {
            Alert('warning', "Please select school")
            schools.style.outline = "2px solid red"
            schools.focus();

        }
        axios({
            method: "GET",
            url: `https://dsms.mentrictech.in/backend/api/auth/school_licenses/${getValues('school_id')}/${e.target.value}`,

        }).then(({ data }) => {
            setLicenseTypeList(data.data.result)
        }).catch((error) => {
            console.log(error);
        })
    }
    function resetSubLicense(z) {
        const sublicense = document.querySelectorAll('.sublicense select');
        setValue('level','');
        setPlans([])
        sublicense.forEach((ele, inx) => {
            if (inx > z)
                ele.value = ''
        })
    }
    const getSubLicense = (e) => {
        resetSubLicense(-1)
        setLicense((license) => ({
            ...license,
            ...{
                license_type_id: e.target.value,
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
            setSubLicenseLavel1List([])
            setSubLicenseLavel2List([])
            setSubLicenseLavel3List([])


        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicenseL1 = (e) => {
        resetSubLicense(0)

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
            setSubLicenseLavel2List([])
            setSubLicenseLavel3List([])
        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicenseL2 = (e) => {
        resetSubLicense(1)

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
            setSubLicenseLavel3List([])
        }).catch((error) => {
            console.log(error);
        })
    }
    const getSubLicenseL3 = (e) => {
        resetSubLicense(2)

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
            if (data.data.success === "falied") {
                Alert('error', data.data.message)
                setPlans([])
            }
            else
                setPlans(data.data.result)

            setValue('subscription_id', '')

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
    function check(e) {
        setValue('school_id', e.target.value, { shouldValidate: true, shouldTouch: true })
        setValue('gender', '')
        if (!getValues('school_id')) {
            e.target.style.outline = '2px solid red'
        }
        else {
            e.target.style.outline = '2px solid black'
        }
    }
    return (
        <div className="bg-slate-200 flex justify-center items-center">
            <form onSubmit={handleSubmit(StudentRegister)} className="p-5 bg-white drop-shadow-xl rounded-lg space-y-1 grid grid-cols-2 gap-5 my-5">
                <h1 className="text-3xl uppercase font-bold">Student Registration</h1>
                <Select errors={errors.school_id} id={'school_id'} {...register('school_id', { required: true })} callback={check} className="col-span-2" List={schoolList} label={"Select School"} />
                <Input errors={errors.first_name_english} name={register('first_name_english', { required: true })} label={'First Name(English)'} />
                <Input errors={errors.second_name_english} name={register('second_name_english', { required: true })} label={'Last Name(English)'} />
                <Input errors={errors.first_name_arabic} name={register('first_name_arabic', { required: true })} label={'First Name(Arabic)'} />
                <Input errors={errors.second_name_arabic} name={register('second_name_arabic', { required: true })} label={'Last Name(Arabic)'} />
                <Input errors={errors.family_name_english} name={register('family_name_english', { required: true })} label={'Family Name(English)'} />
                <Input errors={errors.family_name_arabic} name={register('family_name_arabic', { required: true })} label={'Family Name(Arabic)'} />
                <Input errors={errors.province} name={register('province', { required: true })} label={'Province'} />
                <Input errors={errors.city} name={register('city', { required: true })} label={'City'} />
                <Input errors={errors.email} name={register('email', { required: true })} label={'Email'} type={'email'} />
                <div className="flex items-center gap-2">
                    <Select errors={errors.country_code} className="rounded-none" name={register('country_code', { required: true })} label={'Country Code'} List={[{ id: 0, name: "+966" }, { id: 1, name: "+967" }, { id: 2, name: "+968" }]} />
                    <Input errors={errors.mobile} className="" label={'Mobile Number'} name={register('mobile', { required: true })} type={'tel'} />
                </div>
                <Input errors={errors.dob} name={register('dob', { required: true })} label={'Date of Birth'} type="date" />
                <Select errors={errors.gender} callback={getLicenseTypes} name={register('gender', { required: true })} label={'Gender'} List={GenderList} />
                <Select errors={errors.id_type} name={register('id_type', { required: true })} label={'ID Type'} List={idType} />
                <Input errors={errors.username} name={register('username', { required: true })} label={'Username'} />
                <Input errors={errors.id_number} name={register('id_number', { required: true })} label={'ID No'} />
                <Select callback={getSubLicense} label={<>License Type (<span className="text-red-600 text-xs">NOTE:- First, choose a gender. </span>)</>} List={LicenseTypeList} />
                {license.license_type_id && <Select callback={getSubLicenseL1} className={"sublicense"} label={'Sub License Type'} List={SubLicenseTypeList} />}
                {license.sub_license_id && <Select callback={getSubLicenseL2} className={"sublicense"} label={'Sub License Level 1'} List={SubLicenseLevel1List} />}
                {license.sub_license_lv1_id && <Select callback={getSubLicenseL3} className={"sublicense"} label={'Sub License Level 2'} List={SubLicenseLevel2List} />}
                {license.sub_license_lv2_id && <Select className={"sublicense"} callback={(e) => setLicense((license) => ({ ...license, ...{ sub_license_lv3_id: e.target.value } }))} label={'Sub License Level 3'} List={SubLicenseLevel3List} />}
                <Input errors={errors.password} name={register('password', { required: true })} label={'Password'} type={'password'} />
                <Input errors={errors.confirm_password} name={register('confirm_password', { required: true })} label={'Confirm Password'} type={'password'} />
                <Select errors={errors.level} callback={getPlans} name={register('level_id', { required: true })} label={'Level'} List={levels} />
                <Select errors={errors.subscription_id} name={register('subscription_id', { required: true })} label={'Plan'} List={Plans} />
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