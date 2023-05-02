import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminList } from '../cmps/AdminList'
import { loadProducts, setFilterBy } from '../store/actions/products.actions'
import { removeProduct } from '../store/actions/products.actions'
import { Login } from '../cmps/Login'
import { login } from '../store/actions/user.actions'
import { NavLink, useNavigate } from 'react-router-dom'

export function Admin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const admin = useSelector((storeState) => storeState.userModule.admin)
    const products = useSelector((storeState) => storeState.productsModule.products)
    const filterBy = useSelector((storeState) => storeState.productsModule.filterBy)

    function onRemoveProduct(productId) {
        dispatch(removeProduct(productId))
    }

    useEffect(() => {
        dispatch(setFilterBy({...filterBy , brand: ''}))
        dispatch(loadProducts())
        console.log(products);
    } , [])

    function adminLogin(userCred) {
        try {
            const user = dispatch(login(userCred))
            if(!user) navigate('/')
        } catch(err) {
            console.log('doLogin' , err);
        }
    }


    if(!admin || !Array.isArray(products)) return <Login adminLogin={adminLogin}/>
    return (
        <section className='admin-section'>
            <h1>Admin Actions</h1>
            <AdminList products={products} onRemoveProduct={onRemoveProduct}/>
            <NavLink to="/edit" className='btn-add'>+</NavLink>
        </section>
    )
}
