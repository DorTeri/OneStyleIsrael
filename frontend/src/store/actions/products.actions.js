import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { productService } from "../../services/product.service"
import { SET_BRANDS, REMOVE_PRODUCT, ADD_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT, SET_FILTER_BY } from "../reducers/products.reducer"

export function loadProducts() {
    return async (dispatch, getState) => {
        try {
            const products = await productService.getProducts(getState().productsModule.filterBy)
            const action = {
                type: SET_PRODUCTS,
                products
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function loadBrands() {
    return async (dispatch) => {
        try {
            const brandsArr = await productService.getBrands()
            const brands = brandsArr.reduce((acc, item) => {
                acc[item._id] = item.ctgs;
                return acc;
            }, {});
            const action = {
                type: SET_BRANDS,
                brands
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}



export function removeProduct(productId) {
    return async (dispatch) => {
        try {
            await productService.deleteProduct(productId)
            const action = { type: REMOVE_PRODUCT, productId }
            dispatch(action)
            showSuccessMsg(`Removed successfully`)
            return 'Removed!'
        } catch (error) {
            showErrorMsg(`Something went wrong`)
            console.log('error:', error)
        }
    }
}

export function saveProduct(product) {
    return async (dispatch) => {
        try {
            const type = product._id ? UPDATE_PRODUCT : ADD_PRODUCT
            const newProduct = await productService.saveProduct(product)
            const action = { type, product: newProduct }
            dispatch(action)
            showSuccessMsg(`product ${type}ed successfully`)
            return 'Removed!'
        } catch (error) {
            showErrorMsg(`Something went wrong`)
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}