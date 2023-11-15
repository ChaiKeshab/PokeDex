import { combineReducers } from "redux";
import modalReducer from './pokeModal/reducer'

const rootReducer = combineReducers({
    modalToggleReducer: modalReducer
})

export default rootReducer