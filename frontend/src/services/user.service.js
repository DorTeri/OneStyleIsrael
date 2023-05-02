import { httpService } from "./http.service"

export const userService = {
    getUser,
    signup,
    lastMoves,
    addToCart,
    removeFromCart,
    login,
    getEmptyCred
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

function signup(name) {
    const user = getUser() ||
    {
        name,
        password: '123',
        cart: []
    }
    updateUser(user)
    return user
}

function addToCart(product) {
    const user = getUser()
    user.cart.unshift(product)
    updateUser(user)
    return user
}

function removeFromCart(productId, productSize) {
    const user = getUser()
    const idx = user.cart.findIndex(p => p._id === productId && p.size === productSize)
    user.cart.splice(idx, 1)
    updateUser(user)
    return user
}

function updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function lastMoves(moves, id) {
    if (!id) return moves.splice(moves.length - 4)
    else return moves.filter(move => move.toId === id)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return user
}

function getEmptyCred() {
    return {
        email: '',
        password: ''
    }
}

async function adminSignup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
}

// const adminCred = {
//     email: 'dor@gmail.com',
//     password: '1234',
//     accountName: 'dor'
// }

// adminSignup(adminCred)