import { upperFirst } from './upperFirst'

export const formatJoin = (strArr) => {
    const upperFormatted = strArr.map(elm => upperFirst(elm))
    return (upperFormatted.join(', '))
}