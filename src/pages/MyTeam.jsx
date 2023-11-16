import useLocalStorage from '../hooks/useLocalStorage';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { removePoke, removeAllPoke } from '../redux/index';
import { Button, PokemonGrid } from '../components/index';
import { useState } from 'react';

const MyTeam = () => {
    const dispatch = useDispatch();


    const myTeamListArr = useSelector((state) => state.myTeamReducer.teamList, shallowEqual);
    const [myPokeTeam, setMyPokeTeam] = useLocalStorage('myteam', []);

    const [isShowMenu, setIsShowMenu] = useState(false)

    const toggleMenu = (id, type) => {
        setIsShowMenu(prev => ({
            ...prev,
            [id]: !prev[id],
            type: type
        }));
    };


    const addToMyTeam = (pika) => {
        const isPokeInList = myPokeTeam.findIndex((item) => item.pokeData.id === pika.pokeData.id);
        if (isPokeInList === -1) {
            setMyPokeTeam((prev) => prev.concat(pika))
        }
    }

    const removeFromMyTeam = (pika) => {
        const filteredList = myPokeTeam.filter((item) => item.pokeData.id !== pika.pokeData.id);
        setMyPokeTeam(filteredList)
    }


    return (
        <div className="mx-auto mb-5 md:p-7 md:px-16 lg:h-screen">

            <h1 className="text-4xl mb-3 font-semibold">Pokemon list ({myTeamListArr.length})</h1>

            {myTeamListArr.length > 0 ? (
                <>

                    <Button
                        onClick={() => dispatch(removeAllPoke())}
                        className={'px-2 py-1 ml-2 mb-3 rounded-lg bg-red-400 text-white focus:bg-gray-300'}
                        label={'Clear list'}
                    />


                    <div className="flex p-2 flex-nowrap gap-3 overflow-x-auto">

                        {myTeamListArr?.map((pika) => (

                            <div key={pika.pokeData.id} className="relative flex rounded-3xl flex-col gap-1 items-center">

                                <Button
                                    onClick={() => toggleMenu(pika.pokeData.id, 'list')}
                                >
                                    <PokemonGrid
                                        className={'w-[300px]'}
                                        name={pika.pokeData?.name}
                                        image={pika.pokeData?.sprites?.other.dream_world.front_default}
                                        secondaryImage={pika.pokeData?.sprites?.front_default}
                                        type={pika.pokeData?.types?.map(type => type.type.name)}
                                    />
                                </Button>

                                {isShowMenu[pika.pokeData.id] && isShowMenu.type === 'list' &&
                                    <div className="z-20 absolute bottom-0 bg-gray-100 rounded-lg py-2 flex flex-col">
                                        <Button
                                            onClick={() => {
                                                setIsShowMenu(false)
                                                dispatch(removePoke(pika.pokeData.id))
                                            }}
                                            className={'px-2 py-1 bg-gray-100 hover:bg-red-300'}
                                            label={'Remove from list'}
                                        />

                                        <Button
                                            disabled={myPokeTeam.length >= 6 ? true : false}
                                            onClick={() => {
                                                setIsShowMenu(false)
                                                addToMyTeam(pika)
                                            }}
                                            className={'px-2 py-1 bg-gray-100 hover:bg-blue-300'}
                                            label={'Add to team'}
                                        />
                                    </div>
                                }

                            </div>
                        ))}

                    </div>
                </>

            ) : (
                <></>
            )}



            <h1 className="mt-5 text-4xl mb-3 font-semibold">My Team ({myPokeTeam.length})</h1>

            <div className="grid mt-10 px-2 gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:px-5'">

                {myPokeTeam?.map((pika) => (

                    <div key={pika.pokeData.id} className="relative rounded-3xl flex-col gap-1 items-center">

                        <Button
                            onClick={() => toggleMenu(pika.pokeData.id, 'team')}
                            className={'w-full'}
                        >
                            <PokemonGrid
                                className={'min-w-[300px]'}
                                key={pika.pokeData.id}
                                name={pika.pokeData?.name}
                                image={pika.pokeData?.sprites?.other.dream_world.front_default}
                                secondaryImage={pika.pokeData?.sprites?.front_default}
                                type={pika.pokeData?.types?.map(type => type.type.name)}
                            />
                        </Button>

                        {isShowMenu[pika.pokeData.id] && isShowMenu.type === 'team' &&
                            <Button
                                onClick={() => {
                                    setIsShowMenu(false)
                                    removeFromMyTeam(pika)
                                }}
                                className={'z-20 absolute bottom-5 left-5 px-2 h-fit py-1 rounded-lg bg-red-600 text-white focus:bg-gray-300'}
                                label={'Remove from Team'}
                            />
                        }

                    </div >
                ))}
            </div>

            {isShowMenu &&
                <div
                    className="BACKGROUND z-10 fixed opacity-100 h-screen w-screen top-0 left-0 overflow-hidden"
                    onClick={() => setIsShowMenu(false)}
                ></div>}

        </div>
    );
};

export default MyTeam;
