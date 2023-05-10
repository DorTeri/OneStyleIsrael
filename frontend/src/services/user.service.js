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
  setLocalCart,
  toggleProductToFavorite,
  getEmptyCard
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'))
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  console.log(user)
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
  user = user._id ? user : getUser()
  user.cart = user.cart.filter(p => p.cartId !== productId)
  if (user._id) return await updateUser(user)
  else return updateLocalUser(user)
}

async function toggleProductToFavorite(product, user) {
  console.log('user',user)
    const productIdx = user.favorites.findIndex(p=>p._id===product._id) 
    if(productIdx !== -1) user.favorites.splice(productIdx,1)
    else user.favorites.push(product)
    return await updateUser(user)
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

function getEmptyCard() {
  return {
    amount: '',
    amount: '',
    amount: '',
    amount: '',
    amount: '',
    amount: '',
    amount: '',
  }
}
