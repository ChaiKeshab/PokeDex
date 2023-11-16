import * as ActionTypes from "./actionTypes";


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
