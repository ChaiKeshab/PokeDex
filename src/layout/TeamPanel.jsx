import { useState } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
    isTeamPanelClose,
    createTeam,
    updateTeam,
    deleteTeam
} from '../redux/index'

import { Button, Input } from '../components/index'

import { useQuery } from '@tanstack/react-query'
import { getPokemonAPI } from '../APIs/pokemonApi'

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";


const TeamPanel = () => {

    const dispatch = useDispatch()
    const toggleTeamPanel = useSelector((state) => state.modalToggleReducer.isTeamPanelOpem)

    const myTeamListArr = useSelector((state) => state.myTeamReducer.teamList, shallowEqual);


    const [selectedTeamId, setselectedTeamId] = useState('')
    const [teamInput, setTeamInput] = useState({})
    const [showInputField, setShowInputField] = useState({})


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
    // console.log(allPokeName)



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



    return (
        <>
            <div
                className={`${toggleTeamPanel ? "translate-x-0" : "translate-x-full"} 
                bg-white px-3 z-[15] fixed right-0 top-0 pb-10 h-screen w-full shadow-2xl transform ease-in-out duration-500
                md:px-6 md:w-2/3 lg:w-[50%] xl:1/3`}
            >


                <div className="h-[9vh] flex justify-between border-b mb-2">

                    <h1 className="w-1/2 py-6 text-xl h-full">Configure Team ({myTeamListArr.length})</h1>

                    {/* <div className="w-1/2 py-6 h-full inline-block text-end cursor-pointer"
                        onClick={() => dispatch(isTeamPanelClose())}
                    >
                        <IoMdClose />
                    </div> */}
                </div>



                <div className="h-[80vh] overflow-auto flex flex-col gap-4">


                    {console.log(myTeamListArr)}
                    {myTeamListArr?.map((team) => (

                        <Button
                            key={team.id}
                            onClick={() => setselectedTeamId(team.id)}
                            className='group cursor-default focus:bg-gray-200 hover:bg-gray-100 flex flex-col border border-gray-400 gap-2 p-2'
                        >

                            <div
                                className={'relative flex justify-start border-b border-gray-300 items-center gap-2'}
                            >
                                <h2 className="">{team.teamName}</h2>

                                {showInputField[team.id] &&
                                    <>

                                        {/* 
                                        show input field of only the selected input
                                        curently: all input field are shown
                                        so show? true/false for each input field.

                                        create an object for each input field to store it's condition details

                                        {
                                            "id": id
                                            value: e.target.value,
                                            display: false 
                                        }

                                        after confirming the changed the data (through Enterkey / remove Foucs)
                                        need to update it to redux

                                        for the teamlist of chosen id, change the teamName
                                        

                                                const newTeam = {
                                                "id": id,
                                                "teamName": "New team",
                                                "pokemons": [null, null, null, null, null, null]
                                            }

                                        for teamName change, just dispatch the newTeam name data
                                        
                                        */}

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



                            {/* 
                            editNameIcon on click: open an input field on top of displayed name with
                            displayed name as ||value. onKeyDown or onBlur, update the teamName and 
                            close / hide the input field.

                            */}



                            <div className='flex gap-2 w-full justify-evenly'>
                                {team.pokemons?.map((poke, index) => (
                                    <div
                                        key={index}
                                        className=' border hover:border-gray-400 w-full aspect-[9/10]'
                                    // onClick={ }
                                    >
                                        <CiSquarePlus className='text-gray-400 w-full h-full hover:text-gray-600 duration-300' />
                                    </div>
                                ))}
                            </div>

                            {/* 
                            
                            each pokeSpace on click, should open the pokeList menu.
                            PokeList.onClick => should add that pokemon to the array.
                            multiple same selection should be allowed.
                            max selectable per team = 6
                            
                            
                            Pokelist now has two row:
                            
                            - Selected pokemon at top (pinned)
                            - selectable pokemon 

                            selected pokemon is array of selected pokemon with numbering
                            the array can contain clones

                            the array is mapped in the pokespace

                            to remove pokemon: use the selected pokemon bar
                            the selected pokemon bar will have selected pokemon with different bg
                            selected pokemon on click at right side will remove that poke from array:
                            comes will delete button at right side
                            UI: youtube search and mic combo

                            New problem: second sidebar with responsive!? impossible in vertical screen

                            */}

                        </Button>

                    ))}





                    {/* Edit scrollbar design */}
                    {/* Button onClick: add an obj in array with null default values which will be filled by user
                    - make each team parent as button and make them selectable. when selected, their id is noted
                      and it's used for deleting the team. the delete button being only one at the bottom of page
                      -Genshin impact reference

                      repalce close icon with confim and move it at the bottom along side the delete

                      team name edit is a modal with input-field

                      to add image: click on an empty image field: then a sidebar will appear with list
                      of all the pokemon and a search bar at the top that filters with .includes
                      only shows name for now to minimize apicall and UI
                    
                    */}

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

/**
 * myTeam data format:
 * 
 * data = [
 *     {
 *      "id": "crypto.UUIT... something like that",
 *      "teamName": "Team A",
 *      "pokemons": [1, 2, 3, 4, 5, 6] 
 *    },
 *    {
 *      "id": "crypto.UUID... something like that",
 *      "teamName": "Team B",
 *      "pokemons": [7, 8, 9, 10, 11, 12]
 *    }                                  
 * ]
 * 
 * 
 * features:
 * 
 * display all data and each data of array should be editable 
 * 
 */
