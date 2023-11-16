import { upperFirst } from '../utils/upperFirst'
import { formatJoin } from '../utils/formatJoin'
import { FaArrowLeft } from "react-icons/fa";
import typeColor from '../data/typeColor'
import { Button, DataTable } from '../components/index'
import { isModalClose } from '../redux/index'
import { useState } from 'react';
import { pokeball } from '../assets/index'

import { useDispatch } from "react-redux";
import { addPoke, } from '../redux/index'

const PokeDetailModal = ({
    abilities = [],
    height,
    name,
    sprites,
    stats,
    types = [],
    weight,
    secondaryImage,
    id,
    evolutionInfo,
    setSearchExecute
}) => {

    const dispatch = useDispatch()

    const addToTeamData = {
        abilities,
        height,
        name,
        sprites,
        stats,
        types,
        weight,
        secondaryImage,
        id
    }

    const mainImage = sprites?.other?.dream_world.front_default
    const displayImage = mainImage ? mainImage : secondaryImage

    const isOptions = {
        about: 'about',
        baseStats: 'baseStats',
        evolve: 'evolve'
    }

    const [isOptionChoose, setIsOptionChoose] = useState(isOptions.about)

    let typeColorChoice
    for (let name in typeColor) {
        if (types[0]?.type.name === name) {
            typeColorChoice = typeColor[name]
        }
    }

    const allTypesArr = types?.map(elm => elm.type.name)
    const allAbilitiesArr = abilities?.map(elm => elm.ability.name)

    const pokeAboutData = [
        { label: 'Species', value: formatJoin(allTypesArr) },
        { label: 'Height', value: `${height * 10}cm` },
        { label: 'Weight', value: `${weight / 10}kg` },
        { label: 'Abilities', value: formatJoin(allAbilitiesArr) },
    ]

    const pokeStatData = stats?.map(elm => {
        return (
            { label: upperFirst(elm.stat.name), value: elm.base_stat, }
        )
    })

    const pokeEvolData = evolutionInfo?.map((elm, index) => {
        return {
            label: index + 1,
            value: upperFirst(elm),
        };
    });

    return (
        <div
            style={{ backgroundColor: typeColorChoice }}
            className='z-20 w-full overflow-y-auto rounded-3xl flex flex-col justify-center items-center fixed shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                md:w-fit'
        >

            <div className='text-white p-6 pb-0 w-full gap-2 flex flex-col justify-center items-center'>

                <div className='flex justify-between w-full'>
                    <Button className='' onClick={() => {
                        setSearchExecute('')
                        dispatch(isModalClose())
                    }}
                    >
                        <FaArrowLeft className='text-base' />
                    </Button>

                    <Button
                        className='px-2 py-1 rounded-lg bg-blue-400 focus:bg-white focus:text-black'
                        onClick={() => dispatch(addPoke(addToTeamData))}
                        label={'Add to Team list'}
                    />
                </div>

                {name &&
                    <h1 className='text-3xl'>{upperFirst(name)}</h1>
                }

                <div className='flex gap-1 text-white'>
                    {types?.map((elm, index) => (
                        <div key={index} className='text-sm w-fit py-0.5 px-2 rounded-3xl bg-[rgba(255,255,255,0.2)]' >{upperFirst(elm.type.name)}</div>
                    ))}
                </div>

                <div className='relative -bottom-6'>
                    {!sprites ? <img className='p-1 object-contain object-center w-full aspect-square' src={pokeball} alt={name} /> :
                        <img className='aspect-square p-1 h-36' src={displayImage} alt={name} />
                    }
                </div>
            </div>


            <div className='min-h-[225px] w-full bg-white p-6 shadow-[0_0_4px_rgba(0,0,0,0.6)] rounded-xl 
                md:w-[50vw] lg:w-[35vw]'>

                <div className='flex mt-1 font-bold text-sm'>
                    <Button
                        className={`${isOptionChoose === isOptions.about ? 'text-black border-b border-blue-800' : 'text-gray-400'}
                            p-3`}
                        onClick={() => setIsOptionChoose(isOptions.about)}
                        label={'About'}
                    />
                    <Button
                        className={`${isOptionChoose === isOptions.baseStats ? 'text-black border-b border-blue-800' : 'text-gray-400'}
                            p-3`}
                        onClick={() => setIsOptionChoose(isOptions.baseStats)}
                        label={'Base Stats'}
                    />
                    <Button
                        className={`${isOptionChoose === isOptions.evolve ? 'text-black border-b border-blue-800' : 'text-gray-400'}
                            p-3`}
                        onClick={() => setIsOptionChoose(isOptions.evolve)}
                        label={'Evolution'}
                    />
                </div>

                <hr className='w-full mb-1' />


                {isOptionChoose === isOptions.about &&
                    <DataTable
                        dataArray={pokeAboutData}
                    />
                }

                {isOptionChoose === isOptions.baseStats &&
                    <DataTable
                        dataArray={pokeStatData}
                    />
                }

                {isOptionChoose === isOptions.evolve &&
                    <DataTable
                        dataArray={pokeEvolData}
                    />
                }


            </div>

        </div>
    )
}

export default PokeDetailModal