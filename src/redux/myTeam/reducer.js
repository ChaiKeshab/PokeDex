import * as ActionTypes from "./actionTypes";

const initialState = {
    teamList: []
};

const myTeamReducer = (state = initialState, action) => {
    switch (action.type) {

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
