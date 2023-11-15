/*eslint-disable */
const Button = ({
    quickCss,
    label,
    onClick,
    disabled = false,
    type = 'button',
    className,
    children
}) => {


    return (
        <button
            disabled={disabled}
            type={type}
            className={`${className} cursor-pointer transition-all duration-150 disabled:bg-slate-300 disabled:text-black`}
            onClick={onClick}
        >

            {label && label}
            {children && children}

        </button>
    )
}

export default Button