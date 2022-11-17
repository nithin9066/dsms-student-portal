function ConfirmBox() {
    return (
        <>
            <div className="bg-purple-700/30 w-full h-screen absolute top-0 left-0"></div>
            <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0">
                <div className="bg-purple-700 rounded-lg p-10 space-y-4 drop-shadow-2xl">
                    <h1 className="text-white font-bold text-3xl capitalize">Confirm to submit</h1>
                    <p className="text-white/70 font-medium">Are You Sure ?</p>
                    <div className="flex gap-5 font-bold text-purple-800">
                    <button className="bg-white px-4 py-2 rounded-md">Yes</button>
                    <button className="bg-white px-4 py-2 rounded-md">No</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ConfirmBox;