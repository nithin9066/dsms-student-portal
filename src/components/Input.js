
function Input({label, value, name, isDisabled=false, className='', type='text', errors={}}) {
    return (
        <div className={`${className} flex flex-col gap-1 w-full`}>
            <label className="font-medium text-black">{label}</label>
            <input type={type} {...name} disabled={isDisabled} className="py-2 font-medium border-2 border-black/10 text-black px-3 rounded-md outline-none" value={value} />
            {errors.type === "required" && <span className="text-red-700 text-sm font-medium">This field is required</span>}
        </div>
    );
}

export default Input;