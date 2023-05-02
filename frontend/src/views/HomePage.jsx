import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts, removeProduct, setFilterBy } from '../store/actions/products.actions'
import { ProductList } from '../cmps/ProductList'
import { Loader } from '../cmps/Loader'
import { useParams } from 'react-router-dom'


export function HomePage() {

    const products = useSelector((storeState) => storeState.productsModule.products)
    const filterBy = useSelector((storeState) => storeState.productsModule.filterBy)

    const dispatch = useDispatch()
    const params = useParams()

    const [ brands , setBrands ] = useState([])

    useEffect(() => {
        dispatch(setFilterBy({ ...filterBy, brand: params.brand }))
        dispatch(loadProducts())
    }, [params.brand])

    // useEffect(() => {
    //     dispatch(setFilterBy({ ...filterBy, brand: params.brand }))
    //     dispatch(loadProducts())
    // }, [params.brand])

    useEffect(() => {
        if(!products) return
        setBrands(Object.keys(products))
    } , [products])

    if (!products || Array.isArray(products)) return <Loader />
    return (
        <>
            <section className='homepage-img'>
                <span className='img-title'>ONE STYLE ISRAEL</span>
                <span className='img-title-heb'>החנות שתסדר אותך</span>
                <img src={require('../assets/imgs/photo-grid.jpg')} className='first-img' alt='Product image'/>
            </section>
            <section className='homepage-section'>
                {brands.map(b =>
                    <section className='brand-section' key={b}>
                        <ProductList key={b} products={products[b]} title={b} />
                    </section>
                )}
            </section>
        </>
    )
}
