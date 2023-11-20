import { useState } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
    isPokeListPanelOpen,
    isPokeListPanelClose,
    createTeam,
    updateTeam,
    deleteTeam
} from '../redux/index'

import { upperFirst } from '../utils/upperFirst'

import { Button, Input } from '../components/index'
import PokeListPanel from './PokeListPanel'

import { useQuery } from '@tanstack/react-query'
import { getPokemonAPI } from '../APIs/pokemonApi'

import { MdDeleteSweep } from "react-icons/md";



const TeamPanel = ({ id }) => {

    const dispatch = useDispatch()
    const togglePokeListPanel = useSelector((state) => state.modalToggleReducer.isPokeListPanelOpen)
    const myTeamListArr = useSelector((state) => state.myTeamReducer.teamList, shallowEqual);

    const initialArray = myTeamListArr.filter(team => team.id === id)[0].pokemons

    const initialDisplay = initialArray.filter(team => team !== null)
    console.log(initialDisplay)
    const [searchName, setSearchName] = useState('')
    const [pokeTeamArr, setpokeTeamArr] = useState(initialDisplay)
    const [currentIndex, setCurrentIndex] = useState(0)

    const { data: allPokemon } = useQuery({
        queryKey: ['catchThemALl', 0],
        queryFn: () => getPokemonAPI(0),
    })

    const pokeCount = allPokemon?.count

    const { data: allPokeData, status: allPokeStatus } = useQuery({
        queryKey: ['catchThemALl', pokeCount],
        queryFn: () => getPokemonAPI(0, pokeCount),
        enabled: !!pokeCount
    })

    const allPokeName = allPokeData?.results.map((poke) => poke.name)

    const filteredPoke = allPokeName.filter((name) => {
        const formattedName = name.toLowerCase()
        return formattedName.includes(searchName.toLowerCase())
    })


    const handleSavePoke = (selectedPoke) => {

        //for display

        setpokeTeamArr([
            ...pokeTeamArr,
            selectedPoke
        ])

        const updatedArray = initialArray.map((poke, index) => {
            if (index === currentIndex) {
                return selectedPoke;
            }
            return poke;
        });

        setCurrentIndex(i => i + 1)
        console.log(updatedArray)

        dispatch(updateTeam({
            "id": id,
            "pokemons": updatedArray,
        }))
    }

    /**
    poke from pokeList on click, add that pokemon in an array
    the array format should be:

    length 6, filled with null initilly, when select a pokemon, fill the index 0 with that pokemon and rest 5 null.
    the length will always be 6 regardless of provided pokeData or not.

    for each fill, dispatch the updated data.

    the null data should always be at the end when adding new data or filtering and defined pokemon should be at first

     */


    return (
        <>

            <div
                className={`${togglePokeListPanel ? "translate-x-0 lg:-translate-x-full" : "translate-x-full"} 
                bg-white px-3 z-[45] fixed left-0 top-0 pb-10 h-screen shadow-2xl transform ease-in-out duration-500
                w-2/3 md:px-6 md:w-2/3 lg:w-[50%] xl:1/3`}
            >
                <h1>{id}</h1>

                <div className="mt-5 h-[5vh] flex flex-col justify-between mb-2">

                    <Input
                        id={"search"}
                        type="text"
                        name="user"
                        placeholder={"Search..."}
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className='p-2 w-full rounded-lg'
                    />
                </div>

                <div className=' border-t border-b py-2 justify-center items-center flex flex-col gap-1'>
                    {pokeTeamArr?.map((name, i) => (
                        <Button
                            key={`${name}${i}`}
                            label={name}
                            className={"px-4 text-black py-1 w-full rounded-md bg-gray-300"}
                        />
                    ))}

                </div>


                <div className="h-full border mt-4 overflow-auto flex flex-col gap-1">
                    {filteredPoke?.map((name) => (

                        <Button
                            disabled={pokeTeamArr.length >= 6 ? true : false}
                            key={name}
                            onClick={() => handleSavePoke(name)}
                            label={upperFirst(name)}
                            className={"px-4 text-black py-1 w-full rounded-md bg-gray-300 hover:text-white hover:bg-gray-600"}
                        />

                    ))}
                </div>

            </div >


            {togglePokeListPanel && (
                <div
                    className="BACKGROUND opacity-100 top-0 right-0 z-[40] w-screen fixed h-screen"
                    onClick={() => dispatch(isPokeListPanelClose())}

                ></div>
            )}

        </>)
}

export default TeamPanel