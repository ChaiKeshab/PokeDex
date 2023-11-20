import * as ActionTypes from "./actionTypes";



export const createTeam = (team) => ({
    type: ActionTypes.CREATE_TEAM,
    payload: team,
});

export const updateTeam = (teamInfo) => ({
    type: ActionTypes.UPDATE_TEAM,
    payload: teamInfo,
});

export const deleteTeam = (teamId) => ({
    type: ActionTypes.REMOVE_TEAM,
    payload: teamId
});





export const addPoke = (pokeData) => ({
    type: ActionTypes.UPDATE_CART_ITEM,
    payload: pokeData,
});

export const removePoke = (productId) => ({
    type: ActionTypes.REMOVE_CART_ITEM,
    payload: productId,
});

export const removeAllPoke = () => ({
    type: ActionTypes.REMOVE_CART_ALL,
});
