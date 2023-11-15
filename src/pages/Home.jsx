import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

import { useQuery, useQueries } from '@tanstack/react-query'
import { getPokemonAPI, getSpecificPokemonAPI, getGenerationAPI } from '../APIs/pokemonApi'

import { useDispatch, useSelector } from 'react-redux'
import { isModalClose, isModalOpen } from '../redux/index'

import { Button, PokemonGrid, PokeBallSpinner, NavigateButtons } from '../components/index'
import PokeDetailModal from '../layout/PokeDetailModal'
import { logo } from '../assets/index'
import { scrollToTop } from '../utils/scrollToTop'


const Home = () => {

    const dispatch = useDispatch()
    const [searchParams, setSerchParams] = useSearchParams({
        offset: 0,
        limit: 20
    });

    const currOffset = parseInt(searchParams.get('offset'), 10) || 0;
    // const currLimit = parseInt(searchParams.get('limit'), 10) || 20

    const toggleOpen = useSelector((state) => state.modalToggleReducer.isModalOpen)

    const [pokeDetailData, setpokeDetailData] = useState({})
    const [genSelect, setGenSelect] = useState('All')


    //*****************************************API CALL************************************************/

    const { data: allPokemon, status: allPokeStatus } = useQuery({
        queryKey: ['catchThemALl', currOffset],
        queryFn: () => getPokemonAPI(currOffset),
    })


    let genId = genSelect === 'All' ? 1 : genSelect
    const { data: genPokemon, status: genPokeStatus } = useQuery({
        queryKey: ['genFilter', genId],
        queryFn: () => getGenerationAPI(genId),
    })

    const baseURL = import.meta.env.VITE_BASE_URL

    let pokeURL
    if (genSelect === 'All') {
        pokeURL = allPokemon?.results.map((poke) => poke.url)
    } else {
        pokeURL = genPokemon?.pokemon_species.map((genPoke) => (`${baseURL}/pokemon/${genPoke.name}`))
    }

    const pikadata = useQueries({
        queries: pokeURL ?
            pokeURL.map((poke) => {
                return {
                    queryKey: ["pikachu", poke],
                    queryFn: () => getSpecificPokemonAPI(poke),
                }
            })
            : [],
    })

    //****************************************************************************************************/


    const handleModalTrigger = (details) => {
        dispatch(isModalOpen())
        setpokeDetailData(details)
    }


    // let adjustedOffsetPrev
    // const handlePrev = () => {
    //     scrollToTop()
    //     adjustedOffsetPrev = (currOffset - 20) < 0 ? 0 : (currOffset - 20)
    //     setSerchParams(prev => {
    //         prev.set('offset', adjustedOffsetPrev)
    //         return prev
    //     })
    // }

    // let adjustedOffsetNext
    // const handleNext = () => {
    //     scrollToTop()
    //     const adjustedOffsetNext = (currOffset + 20) > allPokemon.count ? allPokemon.count : (currOffset + 20)
    //     setSerchParams(prev => {
    //         prev.set('offset', adjustedOffsetNext)
    //         return prev
    //     })
    // }




    return (
        <div className={`HOME mx-auto pb-6`}>

            <div className='flex flex-col items-center justify-center'>
                <div className='relative w-fit'>
                    <img className='w-60' src={logo} alt="PokeDex" />
                    <div className='absolute bottom-5 left-1/2 -translate-x-1/2 mx-auto w-24 border-2 border-red-500' />
                </div>

                <div className='flex flex-col gap-2 items-center'>
                    <h1 className='font-semibold text-blue-700 text-lg'>Select Generation:</h1>



                    <div className='shadow-[0_0_11px_rgba(0,0,0,0.3)]'>
                        <Button
                            onClick={() => {
                                setGenSelect('All')
                                scrollToTop()
                            }}
                            className={`${genSelect === 'All' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'All'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('1')
                                scrollToTop()
                            }}
                            className={`${genSelect === '1' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'I'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('2')
                                scrollToTop()
                            }}
                            className={`${genSelect === '2' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'II'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('3')
                                scrollToTop()
                            }}
                            className={`${genSelect === '3' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'III'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('4')
                                scrollToTop()
                            }}
                            className={`${genSelect === '4' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'IV'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('5')
                                scrollToTop()
                            }}
                            className={`${genSelect === '5' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'V'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('6')
                                scrollToTop()
                            }}
                            className={`${genSelect === '6' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'VI'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('7')
                                scrollToTop()
                            }}
                            className={`${genSelect === '7' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'VII'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('8')
                                scrollToTop()
                            }}
                            className={`${genSelect === '8' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'VIII'}
                        />
                        <Button
                            onClick={() => {
                                setGenSelect('9')
                                scrollToTop()
                            }}
                            className={`${genSelect === '9' ? 'bg-gray-300 text border-b border-b-blue-800' : ''}
                                font-bold py-1 px-2 md:py-2 md:px-4`}
                            label={'IX'}
                        />
                    </div>
                </div>
            </div>




            <div className='grid mt-10 px-2 gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:px-5'>

                {allPokeStatus === "pending" || genPokeStatus === "pending" ?

                    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <PokeBallSpinner />
                    </div>
                    : (
                        pikadata?.map((pika, index) =>

                            <Button
                                disabled={pika.data?.error}
                                key={index}
                                onClick={() => handleModalTrigger(pika.data)}
                            >

                                <PokemonGrid
                                    name={pika.data?.name}
                                    image={pika.data?.sprites?.other.dream_world.front_default}
                                    secondaryImage={pika.data?.sprites?.front_default}
                                    type={pika.data?.types?.map(type => type.type.name)}
                                    err={pika.data?.error}
                                />

                            </Button>
                        ))}
            </div>



            {genSelect == 'All' &&
                <NavigateButtons
                    setSerchParams={setSerchParams}
                    currOffset={currOffset}
                    allPokemon={allPokemon}
                />
                // <div className='flex justify-center gap-3 mt-6'>
                //     <Button
                //         disabled={adjustedOffsetPrev <= 0 ? true : false}
                //         onClick={handlePrev}
                //         className={'py-2 px-4 min-w-[90px] rounded-lg bg-gray-300'}
                //         label={'Previous'}
                //     />
                //     <Button
                //         disabled={adjustedOffsetNext >= allPokemon?.count ? true : false}
                //         onClick={handleNext}
                //         className={'py-2 px-4 min-w-[90px] rounded-lg bg-gray-300'}
                //         label={'Next'}
                //     />
                // </div>
            }




            {toggleOpen && (
                <>
                    <div
                        className="BACKGROUND z-10 fixed bg-black opacity-20 h-screen w-screen top-0 left-0 overflow-hidden"
                        onClick={() => dispatch(isModalClose())}
                    ></div>

                    <PokeDetailModal
                        {...pokeDetailData}
                    />
                </>
            )}

        </div>
    )
}

export default Home


/**
 * Home component calls both api, allPokeAPI and singlePokeAPI
 * Child component gets the singlePokeAPI data from cache
 * Since child requires api call for all the pokemons, we call singlePokeAPI for all pokemons in the Home(Parent)
 * 
 * Call allPokeAPI.map => call singlePokeAPI for each pokemon
 * 
 * Now, we need to sync each pokemon details with their respective UI pokemon  
 * */

/**
 * "?offset=40&limit=20" query parameters controls the next and previous.
 * 
 */