function Input({label, value}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium text-black">{label}</label>
            <input disabled className="py-2 font-medium border-2 bg-purple-100 border-black/10 text-black px-3 rounded-md outline-none" value={value} />
        </div>
    );
}

export default Input;