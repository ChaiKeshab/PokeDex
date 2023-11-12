import { useQuery, useMutation } from '@tanstack/react-query'
import { getSpecificPokemonAPI } from '../APIs/pokemonApi'
import { upperFirst } from '../utils/upperFirst'

const PokeDetailModal = ({ name, url }) => {

    //  Example: https://pokeapi.co/api/v2/pokemon/1/
    // const getSpecificPokemonQuery = useQuery({
    //     queryKey: ['doggo', url],
    //     queryFn: () => getSpecificPokemonAPI(url)
    // })


    return (
        <div className='flex p-6 rounded-3xl bg-green-400'>

            <div className='w-1/2 space-y-3'>
                <h1 className='text-2xl font-bold text-slate-100'>{upperFirst(name)}</h1>

                <div className='space-y-1 text-white'>
                    <div className='text-sm w-fit py-0.5 px-2 rounded-3xl bg-[rgba(255,255,255,0.2)]' >Grass</div>
                    <div className='text-sm w-fit py-0.5 px-2 rounded-3xl bg-[rgba(255,255,255,0.2)]' >Poison</div>
                </div>

            </div>

            <div className='w-1/2'>
                {/* <img className='p-1 w-full h-36' src={getSpecificPokemonQuery.data?.sprites.other.dream_world.front_default} alt="" /> */}
                {/* <img className='w-full h-full' src={getSpecificPokemonQuery.data?.sprites.other["official-artwork"].front_default} alt="" /> */}
            </div>

        </div>)
}

export default PokeDetailModal