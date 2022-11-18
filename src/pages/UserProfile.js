import Input from "../components/Input";

function UserProfile() {
    const userData = JSON.parse(sessionStorage.getItem('user')).userdata;
    const userName = () => {
        let name = userData.name;
        name = name.split(" ")
        return name.length > 1 ? name[0][0] + " " + name[1][0] : name[0][0]
    }
    return (
        <div className="grid grid-cols-12 h-screen bg-slate-200 p-5">
            <div className="col-span-3 bg-white/80 rounded-xl text-black/80">
                <div className="flex justify-center flex-col gap-5 items-center my-10">
                    <div className="w-32 h-32 rounded-full bg-black/10 text-4xl text-black font-bold drop-shadow-2xl flex justify-center items-center uppercase">
                        {userName()}
                    </div>
                    <div className="text-xl capitalize font-bold tracking-wider">
                        {userData.name}
                    </div>
                </div>
            </div>
            <div className="col-span-9 flex justify-center items-center overflow-auto">
                <div className="h-full w-full px-5 space-y-5">
                    <h2 className="uppercase px-4 py-5 tracking-wider bg-white/80 font-extrabold text-3xl text-black rounded-xl">Student Profile</h2>
                    <form className="grid grid-cols-2 gap-10 p-10 bg-white/80 rounded-xl">
                        <Input label={'Name'} value={userData.name} />
                        <Input label={'Arabic Name'} value={userData.arabic_name} />
                        <Input label={'UserName'} value={userData.username} />
                        <Input label={'Email'} value={userData.email} />
                        <Input label={'Contact Number'} value={userData.phone} />
                        <Input label={'DOB'} value={userData.dob} />
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Gender</label>
                            <select disabled value={userData.gender} className="border-2 border-black/10 text-black font-bold bg-purple-100 p-2 rounded-md outline-none">
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