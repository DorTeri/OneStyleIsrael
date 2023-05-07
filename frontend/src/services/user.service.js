import { httpService } from './http.service'

export const userService = {
  getUser,
  signup,
  addToCart,
  removeFromCart,
  login,
  getEmptyCred,
  getEmptyContact,
  updateUser,
  logout,
  setLocalCart
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'))
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  return user
}

function signup(userCred) {
  if (getUser()) userCred.cart = getUser().cart
  return httpService.post('auth/signup', userCred)
}

function logout() {
  return httpService.post(`auth/logout`)
}

async function updateUser(user) {
  const savedUser = await httpService.put(`user/${user._id}`, user)
  console.log('savedUser', savedUser)
  return savedUser
}

async function addToCart(product, user) {
  user = user._id ? user : getUser()
  user.cart.unshift(product)
  // user._id ? await updateUser(user) : updateLocalUser(user)
  if (user._id) return await updateUser(user)
  else return updateLocalUser(user)
}

async function removeFromCart(productId, user) {
  console.log('productId123', productId)
  user = user._id ? user : getUser()
  user.cart = user.cart.filter(p => p.cartId !== productId)
  if (user._id) return await updateUser(user)
  else return updateLocalUser(user)
}

function setLocalCart() {
  const user = {
    name: 'Guest',
    cart: [],
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

function updateLocalUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
  return getUser()
}

// function lastMoves(moves, id) {
//     if (!id) return moves.splice(moves.length - 4)
//     else return moves.filter(move => move.toId === id)
// }

function getEmptyCred() {
  return {
    accountName: '',
    email: '',
    password: '',
  }
}

function getEmptyContact() {
  return {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postal: '',
    phone: '',
  }
}
