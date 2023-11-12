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

    const quickClass = {
        // Choices
        default: "",
        icon: "rounded-full w-10 h-10 flex items-center justify-center p-2.5"
    }

    return (
        <button
            disabled={disabled}
            type={type}
            className={`${className} ${quickCss === 'icon' ? quickClass.icon : quickClass.default} 
            cursor-pointer transition-all duration-150 disabled:bg-slate-300 disabled:text-black`}
            onClick={onClick}
        >

            {label && label}
            {children && children}

        </button>
    )
}

export default Button