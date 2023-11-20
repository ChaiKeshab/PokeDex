/*eslint-disable*/
const Input = ({
    id = null,
    type = 'text',
    placeholder = null,
    value,
    onChange,
    onKeyDown,
    className
}) => {
    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`${className} outline-none text-base`}
            />
        </>
    )
}

export default Input