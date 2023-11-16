import { combineReducers } from "redux";
import modalReducer from './pokeModal/reducer'
import myTeamReducer from './myTeam/reducer'

const rootReducer = combineReducers({
    modalToggleReducer: modalReducer,
    myTeamReducer: myTeamReducer
})

export default rootReducer