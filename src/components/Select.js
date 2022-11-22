function Select({name, List=[], label, className='', callback=()=>{}, id, errors={}}) {
    return (
        <div className={`${className} flex flex-col gap-1 w-full`}>
            <label className="font-medium">{label}</label>
            <select id={id} {...name} onChange={callback} className="border border-black/30 rounded-md p-2">
                <option selected value="">Select</option>
                {
                    List.map((item, inx) => <option key={inx} value={item.id}>{item.name}</option>)
                }
            </select>
            {errors.type === "required" && <span className="text-red-700 text-sm font-medium">This field is required</span>}

        </div>
    );
}

export default Select;