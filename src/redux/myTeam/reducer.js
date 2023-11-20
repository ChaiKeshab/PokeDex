import * as ActionTypes from "./actionTypes";

const initialState = {
    teamList: []
};


const myTeamReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.CREATE_TEAM:
            {
                return { ...state, teamList: [...state.teamList, action.payload] }
            }


        case ActionTypes.UPDATE_TEAM: {
            const { id, teamName, pokemons } = action.payload;

            const updatedTeamList = state.teamList.map((item) => {
                if (item.id === id) {
                    // If the ID matches, update the teamName and/or pokemons
                    return {
                        ...item,
                        teamName: teamName !== undefined ? teamName : item.teamName,
                        pokemons: pokemons !== undefined ? pokemons : item.pokemons,
                    };
                }
                // If the ID doesn't match, return the original item
                return item;
            });

            // Check if the team ID was found in the list
            const isPokeInList = state.teamList.some((item) => item.id === id);

            if (!isPokeInList) {
                // If the team ID wasn't found, add the entire payload as a new team
                updatedTeamList.push(action.payload);
            }

            return { ...state, teamList: updatedTeamList };
        }




        case ActionTypes.REMOVE_TEAM:
            {
                const teamId = action.payload;
                const updatedTeamList = state.teamList.filter((item) => item.id !== teamId);
                return { ...state, teamList: updatedTeamList };
            }




        case ActionTypes.REMOVE_CART_ALL:
            {
                return { ...state, teamList: [] }
            }


        case ActionTypes.UPDATE_CART_ITEM:
            {
                const pokeData = action.payload
                const isPokeInList = state.teamList.findIndex((item) => item.pokeData.id === pokeData.id);
                if (isPokeInList === -1) {
                    const updatedTeamList = [...state.teamList, { pokeData }]
                    return { ...state, teamList: updatedTeamList };
                }
                return { ...state };
            }



        case ActionTypes.REMOVE_CART_ITEM:
            {
                const pokeId = action.payload;
                const updatedTeamList = state.teamList.filter((item) => item.pokeData.id !== pokeId);
                return { ...state, teamList: updatedTeamList };
            }



        case ActionTypes.REMOVE_CART_ALL:
            {
                return { ...state, teamList: [] }
            }

        default:
            return state;
    }
};

export default myTeamReducer;


/**
        case ActionTypes.UPDATE_TEAM:
            {
                const { id, teamName, pokemons } = action.payload;

                const isPokeInList = state.teamList.findIndex((item) => item.id === id);

                if (isPokeInList !== -1) {
                    console.log('i got accepted')

                    state.teamList = state.teamList.map((item) => {
                        if (item.id !== id) return

                        else {
                            if (teamName) {
                                return { ...item, teamName: teamName }
                            }
                            if (pokemons) {
                                return {
                                    ...item, pokemons: pokemons
                                }
                            }
                        }
                    })
                }

                else {
                    const updatedTeamList = [...state.teamList, ...action.payload]
                    return { ...state, teamList: updatedTeamList }
                }
                return { ...state };
            }

 */