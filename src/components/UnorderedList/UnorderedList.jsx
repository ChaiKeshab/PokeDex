/*eslint-disable */

const UnorderedList = ({
    items,
    classUl,
    classList
}) => {
    return (
        <ul className={`${classUl}`}>
            {items.map((item, index) => (
                <li key={index} className={`${classList}`}><a href="/">{item}</a></li>
            ))}
        </ul>
    )
}

export default UnorderedList