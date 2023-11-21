import React, { useState } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
    isTeamPanelClose,
    isPokeListPanelOpen,
    isPokeListPanelClose,
    createTeam,
    updateTeam,
    deleteTeam
} from '../redux/index'

import { Button, Input } from '../components/index'

import { useQueries } from '@tanstack/react-query'
import { getSpecificPokemonAPI } from '../APIs/pokemonApi'

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

import PokeListPanel from './PokeListPanel'


const TeamPanel = () => {

    const dispatch = useDispatch()
    const toggleTeamPanel = useSelector((state) => state.modalToggleReducer.isTeamPanelOpem)
    const togglePokeListPanel = useSelector((state) => state.modalToggleReducer.isPokeListPanelOpen)

    const myTeamListArr = useSelector((state) => state.myTeamReducer.teamList, shallowEqual);

    const [teamInput, setTeamInput] = useState({})
    const [showInputField, setShowInputField] = useState({})
    const [selectedTeamId, setselectedTeamId] = useState('')


    // const initialArray = myTeamListArr?.filter(team => team.id === selectedTeamId)
    // const initialDisplay = initialArray[0]?.pokemons?.filter(team => team !== null)
    // console.log(initialArray)

    console.log(myTeamListArr)

    const allSelectedPoke = [...new Set(myTeamListArr?.flatMap(item => item.pokemons))]
        .filter(pokemon => pokemon !== null)

    // console.log(allSelectedPoke)
    /**
     * send pokeURL of every selcted pokemon to this api
     * 
     * to display correct data, we use the initialArray and pokemonName as id
     * if initialArray.name matches with pokeData.name, we use the pokemon image
     * 
     * 
     * parallal queries? so,
     * create an array of all the selected pokemon URL and then useQueries
     */
    const baseURL = import.meta.env.VITE_BASE_URL

    const pokeData = useQueries({
        queries: allSelectedPoke
            ? allSelectedPoke.map((poke) => {
                const url = (`${baseURL}/pokemon/${poke}`)
                return {
                    queryKey: ['pikachu', url],
                    queryFn: () => getSpecificPokemonAPI(url),
                }
            }) : [],
    })
    console.log(pokeData)




    const handleAddNewTeam = () => {
        const id = crypto.randomUUID();
        const newTeam = {
            "id": id,
            "teamName": "New team",
            "pokemons": [null, null, null, null, null, null]
        }

        dispatch(createTeam(newTeam))
    }


    const handleSaveInput = (id) => {
        setShowInputField({
            ...showInputField,
            [id]: false
        })
        const updatedTeamName = teamInput[id]

        if (!updatedTeamName) return

        dispatch(updateTeam({
            "id": id,
            "teamName": updatedTeamName,
        }))
    }


    const PokeListPanelControl = () => {
        dispatch(isPokeListPanelOpen())

    }


    return (
        <>
            <div
                className={`${toggleTeamPanel ? "translate-x-0" : "translate-x-full"} 
                bg-white px-3 z-[15] fixed right-0 top-0 pb-10 h-screen w-full shadow-2xl transform ease-in-out duration-500
                md:px-6 md:w-2/3 lg:w-[50%] xl:1/3`}
            >

                <div className="h-[9vh] flex justify-between border-b mb-2">

                    <h1 className="w-1/2 py-6 text-xl h-full">Configure Team ({myTeamListArr.length})</h1>

                </div>



                <div className="h-[80vh] overflow-auto flex flex-col gap-4">


                    {myTeamListArr?.map((team) => (

                        <React.Fragment key={team.id}>

                            {togglePokeListPanel &&
                                <PokeListPanel
                                    id={selectedTeamId}
                                />
                            }

                            <Button
                                onClick={() => setselectedTeamId(team.id)}
                                className='group cursor-default focus:bg-gray-200 hover:bg-gray-100 flex flex-col border border-gray-400 gap-2 p-2'
                            >

                                <div
                                    className={'relative flex justify-start border-b border-gray-300 items-center gap-2'}
                                >
                                    <h2 className="">{team.teamName}</h2>

                                    {showInputField[team.id] &&
                                        <>

                                            <Input
                                                id={team.id}
                                                placeholder={team.teamName}
                                                value={teamInput[team.id] || ''}

                                                onChange={(e) => setTeamInput({
                                                    ...teamInput,
                                                    [team.id]: e.target.value,
                                                })}

                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSaveInput(team.id)
                                                    }
                                                }}
                                                className={`focus:z-30 w-64 bg-gray-100 absolute top-0 left-0`}
                                            />


                                            <div
                                                className="BACKGROUND opacity-100 top-0 right-0 z-20 w-screen fixed h-screen overflow-hidden"
                                                onClick={() => handleSaveInput(team.id)}
                                            ></div>
                                        </>
                                    }

                                    <label className='hover:cursor-pointer' htmlFor={team.id}>
                                        <FaEdit
                                            onClick={() => setShowInputField({
                                                ...showInputField,
                                                [team.id]: true
                                            })}
                                        />
                                    </label>
                                </div>




                                {/* here____________________________________________ */}

                                <div className='flex gap-2 w-full justify-evenly'>
                                    {/* {team.pokemons?.map((poke, index) => (

                                        <div
                                            key={index}
                                            className=' border hover:border-gray-400 w-full aspect-[9/10]'
                                            onClick={() => PokeListPanelControl()}
                                        >
                                            {console.log(poke)}

                                            {!poke ? (
                                                <CiSquarePlus className='text-gray-400 w-full h-full hover:text-gray-600 duration-300' />
                                            ) :
                                                <>
                                                    <div>{poke}</div>
                                                    
                                                    {pokeData?.filter((pokeInfo, index) => (
                                                        pokeInfo.data?.name === poke
                                                    ))}
                                                </>
                                            }
                                        </div>

                                    ))} */}

                                    {team.pokemons?.map((poke, index) => (
                                        <div
                                            key={index}
                                            className='border hover:border-gray-400 w-full aspect-[9/10]'
                                            onClick={() => PokeListPanelControl()}
                                        >
                                            {poke ? (
                                                pokeData?.map((pokeInfo, pokeIndex) => {
                                                    if (pokeInfo.data?.name === poke) {
                                                        return (
                                                            <React.Fragment key={pokeIndex}>
                                                                {/* <div>{poke}</div> */}
                                                                {pokeInfo.data?.sprites?.other.dream_world.front_default ? (
                                                                    <img
                                                                        src={pokeInfo.data?.sprites?.other.dream_world.front_default}
                                                                        alt={poke}
                                                                        className='w-full h-full p-2'
                                                                    />

                                                                ) : (
                                                                    <img
                                                                        src={pokeInfo.data?.sprites?.front_default}
                                                                        alt={poke}
                                                                        className='w-full h-full p-2'
                                                                    />
                                                                )}
                                                            </React.Fragment>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                <CiSquarePlus className='text-gray-400 w-full h-full hover:text-gray-600 duration-300' />
                                            )}
                                        </div>
                                    ))}

                                </div>






                            </Button>

                        </React.Fragment>
                    ))}


                    <Button
                        onClick={handleAddNewTeam}
                        className={'group p-5 w-full border border-gray-400 hover:bg-gray-600 duration-300'}
                    >
                        <IoIosAddCircleOutline className='group-hover:text-gray-200 duration-150 mx-auto text-6xl md:text-7xl lg:text-8xl text-gray-600' />
                    </Button>

                </div>


                <div className='border-t border-gray-400 p-3 flex gap-3'>

                    <Button
                        onClick={() => dispatch(deleteTeam(selectedTeamId))}
                        className={'group bg-gray-600 p-2 border border-gray-600 rounded-full hover:bg-gray-200 duration-300'}
                    >
                        <MdDeleteSweep className='group-hover:text-gray-600 text-2xl duration-150 text-gray-200' />
                    </Button>


                    <Button
                        onClick={() => dispatch(isTeamPanelClose())}
                        className={'group px-5 py-2 w-full bg-gray-600 border rounded-3xl border-gray-600 hover:bg-gray-200 duration-300'}
                    >
                        <div className='group-hover:text-gray-600 duration-150  text-gray-200'>Confirm</div>
                    </Button>


                </div>

            </div>


            {toggleTeamPanel && (
                <div
                    className="BACKGROUND bg-black opacity-10 top-0 left-0 z-10 w-full fixed h-screen overflow-hidden"
                    onClick={() => dispatch(isTeamPanelClose())}

                ></div>
            )}
        </>)
}

export default TeamPanel