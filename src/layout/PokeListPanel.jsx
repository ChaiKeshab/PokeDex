import { useState } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
    isPokeListPanelClose,
    updateTeam,
} from '../redux/index'

import { upperFirst } from '../utils/upperFirst'
import { Button, Input } from '../components/index'

import { useQuery } from '@tanstack/react-query'
import { getPokemonAPI } from '../APIs/pokemonApi'

import { RiDeleteBack2Fill } from "react-icons/ri";


const TeamPanel = ({ id }) => {

    const dispatch = useDispatch()
    const togglePokeListPanel = useSelector((state) => state.modalToggleReducer.isPokeListPanelOpen)
    const myTeamListArr = useSelector((state) => state.myTeamReducer.teamList, shallowEqual);

    const initialArray = myTeamListArr.filter(team => team.id === id)[0].pokemons

    const initialDisplay = initialArray.filter(team => team !== null)

    const [searchName, setSearchName] = useState('')




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




    const filteredPoke = allPokeName?.filter((name) => {
        const formattedName = name.toLowerCase()
        return formattedName.includes(searchName.toLowerCase())
    })


    const handleSavePoke = (selectedPoke) => {

        const currIndex = initialArray.findIndex((poke) => poke === null);

        const updatedArray = initialArray.map((poke, index) => {
            if (index === currIndex) {
                return selectedPoke;
            }
            return poke;
        });

        dispatch(updateTeam({
            "id": id,
            "pokemons": updatedArray,
        }))
    }


    const deleteSelectedPoke = (delIndex) => {

        const filteredArray = initialArray.filter((poke, index) => index !== delIndex)
        const updatedArray = [...filteredArray, null]

        dispatch(updateTeam({
            "id": id,
            "pokemons": updatedArray,
        }));

    };

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
                    {initialDisplay?.map((name, i) => (

                        <div
                            key={`${name}${i}`}
                            className='flex w-full'
                        >
                            <Button
                                label={upperFirst(name)}
                                className={"px-4 text-black py-1 w-full rounded-l-md bg-gray-300 "}
                            />

                            <Button
                                onClick={() => deleteSelectedPoke(i)}
                                className={"px-2 border-l text-xl border-gray-300 text-black py-1 rounded-r-md bg-gray-300 hover:text-white hover:bg-gray-600"}
                            >
                                <RiDeleteBack2Fill />
                            </Button>
                        </div>
                    ))}

                </div>


                <div className="h-full border mt-4 overflow-auto flex flex-col gap-1">
                    {filteredPoke?.map((name) => (

                        <Button
                            disabled={initialDisplay.length >= 6 ? true : false}
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