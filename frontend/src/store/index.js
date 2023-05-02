import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { userReducer } from './reducers/user.reducer'
import { productsReducer } from './reducers/products.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    productsModule: productsReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.gStore = store