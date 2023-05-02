import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productService } from '../services/product.service'
import { Recommended } from '../cmps/Recommended'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/actions/user.actions'
import { utilService } from '../services/util.service'
import { loadProducts } from '../store/actions/products.actions'
import { Loader } from '../cmps/Loader'
import { showSuccessMsg } from '../services/event-bus.service'

export function ProductDetails() {

    const products = useSelector((storeState) => storeState.productsModule.products)

    const dispatch = useDispatch()
    const params = useParams()

    const [product, setProduct] = useState(null)
    const [cartProduct, setCartProduct] = useState(null)

    useEffect(() => {
        console.log(products);
        dispatch(loadProducts())
    }, [])

    useEffect(() => {
        loadProduct()
    }, [params.id])

    async function loadProduct() {
        try {
            const product = await productService.getProductById(params.id)
            setProduct(product)
        } catch (err) {
            console.log('error details', err)
        }
    }

    function recommended() {
        if(products) {
            if (Array.isArray(products)) {
                return products.filter(p => p.brand === product.brand).splice(0, 8)
            } else {
                return products[Object.keys(products).find(b => product.brand === b)].splice(0 , 8)
            }
        }
    }

    function sizes() {
        const sizes = ['Select Size']
        for (let i = 36; i < 47; i++) {
            sizes.push(i)
        }
        return sizes
    }

    function handleChange(ev) {
        console.log(ev.target.value);
        setCartProduct({ ...product, size: ev.target.value })
    }

    function onAddToCart() {
        if(!cartProduct) return
        dispatch(addToCart(cartProduct))
        showSuccessMsg(`Added to cart successfully`)
    }

    if (!product || !products) return <Loader />
    return (
        <section className='product-details'>
            <section className='info'>
                <div className='imgs-wrapper'>
                    <img src={product.url1} alt='shoe' />
                    <img src={product.url2} alt='shoe' />
                    <img src={product.url3} alt='shoe' />
                    <img src={product.url4} alt='shoe' />
                </div>
                <div className='product-add-section'>
                    <div className='product-add'>
                        <h3>{utilService.capFirstLetter(product.brand)}</h3>
                        <h5>{product.model}</h5>
                        <h4><span>&#8362;</span> {product.price}</h4>
                        {/* <Select options={sizes()} onChange={(val) => handleChange(val)}/> */}
                        <select className='size-select' onChange={(ev) => handleChange(ev)}>
                            {sizes().map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className='btn-container flex align-center space-between'>
                            <button className='btn-add' onClick={() => onAddToCart()}>
                                Add To Cart
                            </button>
                            <button className='btn-favorite'>
                                🖤
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Recommended products={recommended()} />
        </section>
    )
}
