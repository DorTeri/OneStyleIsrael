
export const SET_USER = 'SET_USER'
export const SET_ADMIN = 'SET_ADMIN'


const INITIAL_STATE = {
    loggedInUser: null,
    admin: null
}

export function userReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }

        case SET_ADMIN:
            return {
                ...state,
                admin: action.user
            }

        default:
            return state;
    }
}