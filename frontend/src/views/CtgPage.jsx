import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ProductList } from '../cmps/ProductList'
import { loadProducts, setFilterBy } from '../store/actions/products.actions'

export function CtgPage() {

    const products = useSelector((storeState) => storeState.productsModule.products)
    const filterBy = useSelector((storeState) => storeState.productsModule.filterBy)

    const [ productsByCtg , setProductsByCtg ] = useState([])
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(setFilterBy({...filterBy , brand: params.brand}))
        dispatch(loadProducts())
    }, [params.brand])

    useEffect(() => {
        setProductsByCtg(getProducts())
    }, [params.ctg , products]) 

    function getProducts() {
        if(!Array.isArray(products)) return
        return products.filter(p => p.ctg === params.ctg)
    }

    return (
        <section className='ctg-section'>
            <ProductList products={productsByCtg} title={params.ctg}/>
        </section>
    )
}
