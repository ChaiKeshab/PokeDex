
const initialState = {
    isModalOpen: false
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

        default:
            return state
    }
}

export default modalReducer