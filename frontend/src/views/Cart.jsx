import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { CartPreview } from '../cmps/CartPreview'
import { removeFromCart } from '../store/actions/user.actions'
import { Recommended } from '../cmps/Recommended'
import { productService } from '../services/product.service'
import { Loader } from '../cmps/Loader'

export function Cart() {

    const products = useSelector((storeState) => storeState.productsModule.products)
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const dispatch = useDispatch()

    const [ subtotal , setSubtotal] = useState(null)
    const [ total , setTotal] = useState(null) 

    useEffect(() => {
        setSubtotal(getSubtotal())
        setTotal(getSubtotal() + 50)
    } , [user.cart])

    function onRemoveProduct(productId, productSize) {
        dispatch(removeFromCart(productId, productSize))
    }

    function getSubtotal() {
        return user.cart.reduce((acc, p) => {
            acc += p.price
            return acc
        }, 0)
    }

    function recommended() {
        if (Array.isArray(products)) {
            return products.filter(p => p.brand === user.cart[0].brand).splice(0, 8)
        } else {
            return products[user.cart[0].brand]
        }
    }

    function checkout() {
        productService.checkout()
    }


    if (!user) return <Loader />
    else if (!user.cart.length) return (
        <div>
            You have no products in your cart go shopping
        </div>
    )
    return (
        <section className='cart-section'>
            <div className='cart-header flex align-center space-between'>
                <h2>SHOPPING CART</h2>
                <NavLink to='/'>Continue shopping</NavLink>
            </div>
            <div className='cart-content'>
                {user.cart.map((p, idx) => <CartPreview key={idx} product={p} onRemoveProduct={onRemoveProduct} />)}
            </div>
            <div className='cart-summary'>
                <h3>Summary</h3>
                <h4>Subtotal <span>&#8362;{subtotal}.00</span></h4>
                <h4>Delivery <span>&#8362;50.00</span></h4>
                <h4 className='total'>Total <span>&#8362;{total}.00</span></h4>
                <button className='checkout' onClick={() => checkout()}>Checkout</button>
            </div>
            <Recommended products={recommended()}/>
        </section>
    )
}
