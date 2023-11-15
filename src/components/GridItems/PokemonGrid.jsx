import { upperFirst } from '../../utils/upperFirst'
import { pokeball } from '../../assets/index'
import typeColor from '../../data/typeColor'
import { useState } from 'react'

const PokemonGrid = ({ name, image, secondaryImage, type = [], err }) => {

    const displayImage = image ? image : secondaryImage
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!name || !type || err) return (
        <div className='skeleton p-6 rounded-3xl' >
            <img className='p-1 object-contain object-center w-full h-36' src={pokeball} alt={name} />
        </div >
    )

    //  type received from array and typeColor object may have uppercase letter problem if error encountered. 
    //  Use the upperFirst function at that point

    let typeColorChoice
    for (let name in typeColor) {
        if (type[0] === name) {
            typeColorChoice = typeColor[name]
        }
    }

    return (
        <div
            style={{ backgroundColor: typeColorChoice }}
            className={`flex p-6 rounded-3xl`}
        >
            <div className='w-1/2 space-y-3'>
                <h1 className='text-left text-2xl font-bold text-slate-100'>{upperFirst(name)}</h1>

                <div className='space-y-1 text-white'>
                    {type?.map((elm, index) => (
                        <div key={index} className='text-sm w-fit py-0.5 px-2 rounded-3xl bg-[rgba(255,255,255,0.2)]' >{upperFirst(elm)}</div>
                    ))}
                </div>

            </div>

            <div className='w-1/2'>
                {!imageLoaded ? (
                    <div className='p-1 object-contain object-center w-full h-36'>
                        <img
                            style={{ visibility: 'hidden' }}
                            onLoad={() => setImageLoaded(true)}
                            src={displayImage}
                            alt='pokemon'
                        />
                        <img className='p-1 w-full h-36' src={pokeball} alt='loading' />
                    </div>
                ) : (
                    <img className='p-1 w-full h-36' src={displayImage} alt={name} />
                )}
            </div>

        </div>
    )
}
export default PokemonGrid