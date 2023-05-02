import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { userService } from "../../services/user.service"
import { SET_USER , SET_ADMIN  } from "../reducers/user.reducer"

export function addToCart(product) {
    return async (dispatch, getState) => {
        try {
            const user = userService.addToCart(product)
            dispatch({ type: SET_USER, user})
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeFromCart(productId , productSize) {
    return async (dispatch, getState) => {
        try {
            const user = userService.removeFromCart(productId , productSize)
            dispatch({ type: SET_USER, user})
            showSuccessMsg(`Product removed successfully`)
        } catch (error) {
            showErrorMsg(`Something went wrong`)
            console.log('error:', error)
        }
    }
}

export function signup(name) {
    return async (dispatch, getState) => {
        try {
            const user = userService.signup(name)
            dispatch({ type: SET_USER, user})
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function login(userCred) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.login(userCred)
            if(user) dispatch({ type: SET_ADMIN, user})
            return user
        } catch (error) {
            console.log('error:', error)
        }
    }
}
