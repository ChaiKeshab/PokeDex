
const DataTable = ({ dataArray = [] }) => {
    return (
        <table className="bg-white">
            <tbody>
                {dataArray.map((item, index) => (
                    <tr key={index}>
                        <th className="py-1.5 pl-0 pr-16 text-sm text-left text-gray-600 font-semibold">
                            {item.label}
                        </th>
                        <td className="font-bold text-sm">{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>)
}

export default DataTable