import Input from "../components/Input";

function UserProfile() {
    const userData = JSON.parse(sessionStorage.getItem('user')).userdata;
    const userName = () => {
        let name = userData.name;
        name = name.split(" ")
        return name.length > 1 ? name[0][0] + " " + name[1][0] : name[0][0]
    }
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-3 bg-purple-700 text-white/80">
                <div className="flex justify-center flex-col gap-5 items-center my-10">
                    <div className="w-32 h-32 rounded-full bg-white/70 text-4xl text-purple-700 font-bold drop-shadow-2xl flex justify-center items-center uppercase">
                        {userName()}
                    </div>
                    <div className="text-xl capitalize font-bold tracking-wider">
                        {userData.name}
                    </div>
                </div>
            </div>
            <div className="col-span-9 bg-slate-100 flex justify-center items-center">
                <div className="h-full w-full">
                    <h2 className="uppercase px-2 py-5 tracking-wider bg-purple-700 font-extrabold text-3xl text-white">Student Profile</h2>
                    <form className="grid grid-cols-2 gap-5 p-10">
                        <Input label={'Name'} value={userData.name} />
                        <Input label={'Arabic Name'} value={userData.arabic_name} />
                        <Input label={'UserName'} value={userData.username} />
                        <Input label={'Email'} value={userData.email} />
                        <Input label={'Contact Number'} value={userData.phone} />
                        <Input label={'DOB'} value={userData.dob} />
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Gender</label>
                            <select disabled value={userData.gender} className="border-2 border-purple-400 text-purple-900 font-bold bg-purple-100 p-2 rounded-md outline-none">
                                <option>Select</option>
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                            </select>
                        </div>
                        <Input label={'City'} value={userData.city} />
                        <Input label={'Address'} value={userData.address} />

                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;