
const initialState = {
    isModalOpen: false,
    isTeamPanelOpem: false,
    isPokeListPanelOpen: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {

        case "IS_MODAL_OPEN":
            return {
                ...state,
                isModalOpen: true
            }

        case "IS_MODAL_CLOSE":
            return {
                ...state,
                isModalOpen: false
            }

        case "IS_TEAM_PANEL_OPEN":
            return {
                ...state,
                isTeamPanelOpem: true
            }

        case "IS_TEAM_PANEL_CLOSE":
            return {
                ...state,
                isTeamPanelOpem: false
            }

        case "IS_POKE_LIST_PANEL_OPEN":
            return {
                ...state,
                isPokeListPanelOpen: true
            }

        case "IS_POKE_LIST_PANEL_CLOSE":
            return {
                ...state,
                isPokeListPanelOpen: false
            }

        default:
            return state
    }
}

export default modalReducer