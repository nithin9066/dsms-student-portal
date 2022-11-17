function Input({label, value}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium text-purple-600">{label}</label>
            <input disabled className="py-2 font-medium border-2 bg-purple-100 border-purple-300 text-purple-900 px-3 rounded-md outline-none" value={value} />
        </div>
    );
}

export default Input;