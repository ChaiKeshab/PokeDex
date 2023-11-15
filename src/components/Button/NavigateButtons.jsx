import { Button } from '../index'
import { scrollToTop } from '../../utils/scrollToTop'

const NavigateButtons = ({ setSerchParams, currOffset, allPokemon }) => {

    let adjustedOffsetPrev
    const handlePrev = () => {
        scrollToTop()
        adjustedOffsetPrev = (currOffset - 20) < 0 ? 0 : (currOffset - 20)
        setSerchParams(prev => {
            prev.set('offset', adjustedOffsetPrev)
            return prev
        })
    }

    let adjustedOffsetNext
    const handleNext = () => {
        scrollToTop()
        const adjustedOffsetNext = (currOffset + 20) > allPokemon.count ? allPokemon.count : (currOffset + 20)
        setSerchParams(prev => {
            prev.set('offset', adjustedOffsetNext)
            return prev
        })
    }

    return (
        <div className='flex justify-center gap-3 mt-6'>
            <Button
                disabled={adjustedOffsetPrev <= 0 ? true : false}
                onClick={handlePrev}
                className={'py-2 px-4 min-w-[90px] rounded-lg bg-gray-300'}
                label={'Previous'}
            />
            <Button
                disabled={adjustedOffsetNext >= allPokemon?.count ? true : false}
                onClick={handleNext}
                className={'py-2 px-4 min-w-[90px] rounded-lg bg-gray-300'}
                label={'Next'}
            />
        </div>)
}

export default NavigateButtons