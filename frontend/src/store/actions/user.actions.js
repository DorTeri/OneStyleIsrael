import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { userService } from "../../services/user.service"
import { SET_USER } from "../reducers/user.reducer"

export function addToCart(product) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.addToCart(product , getState().userModule.loggedInUser)
            dispatch({ type: SET_USER, user })
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeFromCart(productId) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.removeFromCart(productId, getState().userModule.loggedInUser)
            dispatch({ type: SET_USER, user })
            showSuccessMsg(`Product removed successfully`)
        } catch (error) {
            showErrorMsg(`Something went wrong`)
            console.log('error:', error)
        }
    }
}

export function signup(userCred) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.signup(userCred)
            dispatch({ type: SET_USER, user })
            showSuccessMsg('Signed up seccessfully')
            return user
        } catch (error) {
            showErrorMsg('Something went wrong')
            console.log('error:', error)
        }
    }
}

export function login(userCred) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.login(userCred)
            if (user) dispatch({ type: SET_USER, user })
            return user
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function updateUser(user) {
    return async (dispatch) => {
        try {
            const newUser = await userService.updateUser(user)
            const action = { type: SET_USER, user: newUser }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            showErrorMsg(`Something went wrong`)
            console.log('error:', error)
        }
    }
}

export function setLocalCart() {
    return (dispatch, getState) => {
        try {
            const user = userService.setLocalCart()
            dispatch({ type: SET_USER, user })
            return user
        } catch (error) {
            console.log('error:', error)
        }
    }
}
