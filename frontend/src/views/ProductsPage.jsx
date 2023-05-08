import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadProducts, removeProduct, setFilterBy } from '../store/actions/products.actions'
import { ProductList } from '../cmps/ProductList'
import { Loader } from '../cmps/Loader'

export function ProductsPage() {

    const products = useSelector((storeState) => storeState.productsModule.products)
    const filterBy = useSelector((storeState) => storeState.productsModule.filterBy)

    const [ctgs, setCtgs] = useState([])
    const [filter, setFilter] = useState({...filterBy})

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilterBy({ ...filterBy, brand: params.brand }))
        dispatch(loadProducts())
    }, [params.brand])

    useEffect(() => {
        dispatch(setFilterBy({ ...filterBy, filter }))
    }, [filter])

    useEffect(() => {
        setCtgs(setBrandCtgs())
    }, [products])

    function filteredByCtg(ctg) {
        return products.filter(p => p.ctg === ctg)
    }

    function updateFilter(filter) {
        setFilter(filter)
    }

    function setBrandCtgs() {
        if (!products || !Array.isArray(products)) return
        return products.reduce((acc, p) => {
            if (!acc.includes(p.ctg)) acc.push(p.ctg)
            return acc
        }, [])
    }

    function onRemoveProduct(productId) {
        dispatch(removeProduct(productId))
        dispatch(loadProducts())
    }


    if (!products || !ctgs) return <Loader />
    return (
        <section className='products-page'>
            {ctgs.map(c => <ProductList key={c} products={filteredByCtg(c)} title={c} onRemoveProduct={onRemoveProduct} />)}
        </section>
    )
}
