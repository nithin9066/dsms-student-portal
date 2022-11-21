function Select({name, List=[], label, className='', callback=()=>{}}) {
    return (
        <div className={`${className} flex flex-col gap-1 w-full`}>
            <label className="font-medium">{label}</label>
            <select {...name} onChange={callback} className="border border-black/30 rounded-md p-2">
                <option selected>Select</option>
                {
                    List.map((item, inx) => <option key={inx} value={item.id}>{item.name}</option>)
                }
            </select>
        </div>
    );
}

export default Select;