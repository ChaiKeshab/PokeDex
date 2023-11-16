import { Button } from '../index'
import { scrollToTop } from '../../utils/scrollToTop'

const NavigateButtons = ({ setSerchParams, currOffset, allPokemon }) => {

    const handlePrev = () => {
        scrollToTop()
        const adjustedOffsetPrev = (currOffset - 20) < 0 ? 0 : (currOffset - 20)
        setSerchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('offset', adjustedOffsetPrev.toString())
            return params
        })
    }

    const handleNext = () => {
        scrollToTop()
        const adjustedOffsetNext = (currOffset + 20) > (allPokemon.count - 9) ? (allPokemon.count - 9) : (currOffset + 20)
        setSerchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('offset', adjustedOffsetNext.toString())
            return params
        })
    }

    return (
        <div className='flex justify-center gap-3 mt-6'>
            <Button
                onClick={handlePrev}
                className={'py-2 px-4 min-w-[90px] rounded-lg bg-gray-300'}
                label={'Previous'}
                disabled={currOffset <= 0}
            />
            <Button
                disabled={currOffset >= (allPokemon?.count - 9)}
                onClick={handleNext}
                className={'py-2 px-4 min-w-[90px] rounded-lg bg-gray-300'}
                label={'Next'}
            />
        </div>
    )
}

export default NavigateButtons
