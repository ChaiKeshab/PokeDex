import { logo } from '../assets/index'
import { useQuery, useMutation, useQueries } from '@tanstack/react-query'
import { getPokemonAPI, getSpecificPokemonAPI } from '../APIs/pokemonApi'
import { Button, PokemonGrid } from '../components/index'
import PokeDetailModal from '../layout/PokeDetailModal'
import { useState } from 'react'


const Home = () => {

    const { data: allPokemon, status: allPokeStatus } = useQuery({
        queryKey: ['catchThemALl'],
        queryFn: getPokemonAPI,
        // select: (pokemons) => pokemons.results.map((poke) => poke.url)
    })

    const pokeURL = allPokemon?.results.map((poke) => poke.url)

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

    console.log(pikadata, 'pikaPika')


    // const pokeURL = allPokemon?.results.map((poke) => poke.url)

    // const getSpecificPokemonQuery = useQuery({
    //     queryKey: ['getSpecificPokemon', pokeURL],
    //     queryFn: () => getSpecificPokemonAPI(pokeURL),

    //     enabled: !!pokeURL,
    // })

    const [isModalOpen, setIsModalOpen] = useState(false)

    // console.log(getPokemonQuery.data?.results[0].name)

    return (
        <div className={`HOME ${isModalOpen && 'overflow-hidden'} overflow-y-hidden mx-auto`}>

            <div className='flex flex-col items-center justify-center'>
                <div className='relative w-fit'>
                    <img className='w-60' src={logo} alt="PokeDex" />
                    <div className='absolute bottom-5 left-1/2 -translate-x-1/2 mx-auto w-24 border-2 border-red-500' />
                </div>

                <div>
                    <h1 className='font-semibold text-blue-700 text-lg'>Select Generation:</h1>
                </div>
            </div>




            <div className='grid mt-10 px-5 gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
                {allPokeStatus === "success" &&
                    allPokemon?.results.map((pokemon, index) => (
                        <Button
                            key={index}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PokemonGrid
                                {...pokemon}
                            />
                        </Button>
                    ))}
            </div>




            {isModalOpen && (
                <>
                    <div
                        className="BACKGROUND z-10 w-full fixed bg-black opacity-20 h-screen top-0 left-0 overflow-hidden"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* <PokeDetailModal
                    /> */}
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
 * LOGIC_2
 * 
 * After allPokeAPI, i need to call the singlePokeAPI to display their type (eg: grass, poison for bulbasaur)
 */