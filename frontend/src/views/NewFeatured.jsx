import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  loadProducts,
  removeProduct,
  setFilterBy,
} from '../store/actions/products.actions'
import { ProductList } from '../cmps/ProductList'


export function NewFeatured() {
  const filterBy = useSelector((storeState) => storeState.productsModule.filterBy)
  const dispatch = useDispatch()
  const products = useSelector(
    (storeState) => storeState.productsModule.products
    )
    

  useEffect(() => {
    dispatch(setFilterBy({ ...filterBy, brand: 'new' }))
    dispatch(loadProducts())
  }, [dispatch])

  return (
    <div className="new-featured-container">
      <h1>New Products</h1>
      <ProductList products={products} />
    </div>
  )
}