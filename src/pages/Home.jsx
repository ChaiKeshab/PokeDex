import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

import { useQuery, useQueries } from '@tanstack/react-query'
import {
    getPokemonAPI,
    getSpecificPokemonAPI,
    getGenerationAPI,
    getPokeSpeciesAPI,
    getSearchPokeAPI
} from '../APIs/pokemonApi'

import { useDispatch, useSelector } from 'react-redux'
import { isModalClose, isModalOpen, isTeamPanelClose, isTeamPanelOpen } from '../redux/index'

import { Button, PokemonGrid, PokeBallSpinner, NavigateButtons, Input } from '../components/index'
import PokeDetailModal from '../layout/PokeDetailModal'
import { logo } from '../assets/index'
import { scrollToTop } from '../utils/scrollToTop'
import { extractPokemonNames } from '../utils/evolutionFormat'


const Home = () => {

    const dispatch = useDispatch()
    const toggleOpen = useSelector((state) => state.modalToggleReducer.isModalOpen)
    const toggleTeamPanel = useSelector((state) => state.modalToggleReducer.isTeamPanelOpem)


    const [searchParams, setSerchParams] = useSearchParams({
        offset: 0,
        limit: 20
    });

    const currOffset = parseInt(searchParams.get('offset'), 10) || 0;
    // const currLimit = parseInt(searchParams.get('limit'), 10) || 20


    const [pokeDetailData, setpokeDetailData] = useState({})
    const [genSelect, setGenSelect] = useState('All')
    const [speciesName, setSpeciesName] = useState('')
    const [searchName, setSearchName] = useState('')
    const [searchExecute, setSearchExecute] = useState('')


    //*****************************************API CALL************************************************/

    const { data: allPokemon, status: allPokeStatus } = useQuery({
        queryKey: ['catchThemALl', currOffset],
        queryFn: () => getPokemonAPI(currOffset),
    })


    const genId = genSelect === 'All' ? null : genSelect
    const { data: genPokemon, status: genPokeStatus } = useQuery({
        queryKey: ['genFilter', genId],
        queryFn: () => getGenerationAPI(genId),
        enabled: !!genId
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
            pokeURL.map((url) => {
                return {
                    queryKey: ["pikachu", url],
                    queryFn: () => getSpecificPokemonAPI(url),
                }
            })
            : [],
    })


    const { data: evolURL, status: allEvolutionStatus } = useQuery({
        queryKey: ['evolURL', speciesName],
        queryFn: () => getPokeSpeciesAPI(speciesName),
        select: (evol) => evol.evolution_chain.url,
        enabled: !!speciesName
    })

    const evolData = useQuery({
        queryKey: ['evolData', evolURL],
        queryFn: () => getSpecificPokemonAPI(evolURL),
        enabled: !!evolURL,
    })


    const { data: searchData, status: searchDataStatus } = useQuery({
        queryKey: ['search', searchExecute],
        queryFn: () => getSearchPokeAPI(searchExecute),
        enabled: !!searchExecute,
    })

    /**
     * for search bar, 2 api needs to be called
     * first: /pokemon/name and second: evolURl
     * feed both data in PokeDetailModal component
     * call when? setup Search bar. user inputs data and press ENTER, we call api
     * search accepts name and number. convert data to lowercase and trim
     * 
     *
     */
    //****************************************************************************************************/

    const handleSubmit = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            setSearchExecute(searchName.trim().toLowerCase());
            setSpeciesName(searchName.trim().toLowerCase())
            setSearchName('')
        }
    }

    const handleModalTrigger = (details) => {
        dispatch(isModalOpen())
        setpokeDetailData(details)
    }

    useEffect(() => {
        if (searchData) {
            dispatch(isModalOpen())
            setpokeDetailData(searchData)
        }
    }, [searchData, dispatch]);


    return (
        <div className={`HOME mx-auto pb-6`}>

            <div className='flex flex-col items-center justify-center'>
                <div className='relative w-fit'>
                    <img className='w-60' src={logo} alt="PokeDex" />
                    <div className='absolute bottom-5 left-1/2 -translate-x-1/2 mx-auto w-24 border-2 border-red-500' />
                </div>

                <Input
                    id={"search"}
                    type="text"
                    name="user"
                    placeholder={"Search..."}
                    value={searchName}
                    onKeyDown={handleSubmit}
                    onChange={(e) => setSearchName(e.target.value)}
                    className='p-2 w-[300px] border rounded-lg md:w-[500px]'
                />

                <div className='flex flex-col gap-2 items-center w-full'>
                    <h1 className='font-semibold text-blue-700 text-lg'>Select Generation:</h1>


                    <div className='relative flex flex-col gap-3 items-center justify-center w-full'>
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

                        <Button
                            onClick={() => dispatch(isTeamPanelOpen())}
                            className={'lg:absolute right-0 lg:-translate-x-full bg-gray-300 rounded-lg py-1 px-2 md:py-2 md:px-4'}
                            label={'Create a team'}
                        />

                    </div>

                </div>
            </div>




            <div className='grid mt-10 px-2 gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:px-5'>

                {(allPokeStatus === "pending" && genSelect === "All") ||
                    (genPokeStatus === "pending" && genSelect !== "All") ?

                    <div className='fixed top-1/2 left-1/2 -translate-x-1/2'>
                        <PokeBallSpinner />
                    </div>
                    : (
                        pikadata?.map((pika, index) =>

                            <Button
                                disabled={pika.data?.error}
                                key={index}
                                onClick={() => {
                                    handleModalTrigger(pika.data)
                                    setSpeciesName(pika.data?.name)
                                }}
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



            {allPokeStatus === "success" && genSelect === 'All' &&
                <NavigateButtons
                    setSerchParams={setSerchParams}
                    currOffset={currOffset}
                    allPokemon={allPokemon}
                />
            }



            {searchExecute && searchDataStatus === 'pending' &&
                <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <PokeBallSpinner />
                </div>
            }

            {toggleOpen && (
                <>
                    <div
                        className="BACKGROUND z-10 fixed bg-black opacity-20 h-screen w-screen top-0 left-0 overflow-hidden"
                        onClick={() => {
                            setSearchExecute('')
                            dispatch(isModalClose())
                        }}
                    ></div>

                    {pokeDetailData.error ?
                        <div
                            className='z-20 bg-red-500 w-full p-6 text-gray-100 rounded-lg fixed shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                md:w-fit'
                        >
                            {pokeDetailData.message}
                        </div>
                        :
                        <PokeDetailModal
                            secondaryImage={pokeDetailData?.sprites?.front_default}
                            evolutionInfo={extractPokemonNames(evolData.data)}
                            {...pokeDetailData}
                            setSearchExecute={setSearchExecute}
                        />
                    }
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

/**
 * gen api gives name and species url
 * what we need: when modal is toggled, we send id/name and using that, we call species api of that id/name
 * using that, we consecutively call another api within the results and extract the required data
 * 
 * so api is to be called for single pokemon only when id/name is provided.
 * 
 * existing potentially usable api: gen api does give name and url but what we want is not the url
 * we can craft it with the name, NO NEED FOR GEN API. 
 * 
 * setup a species api ready to take name/id and then call.
 * after that, consecutively call another api from the results
 */

/**
 * New team logic:
 * 
 * new api: call the all pokemon api with max limit: 1292
 * or in serial after the allPokemon api once we get the pokeCount
 * 
 * a button opening a dropdown menu.
 * In the menu, we got 1:arraylist, 2: button:Create new team.
 * arrayList is the list of all the existing team
 * 
 * button:onClick:
 */