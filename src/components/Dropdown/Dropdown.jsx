/*eslint-disable */
function Dropdown({
    label,
    id,
    name,
    options,
    value,
    onChange,
    disabled = false,
    className
}) {
    return (
        <>
            <label htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`${className} outline-none`}
                disabled={disabled}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}
                        className=""                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Dropdown;
