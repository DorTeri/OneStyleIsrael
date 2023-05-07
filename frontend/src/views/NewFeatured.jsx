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
  const products = useSelector(
    (storeState) => storeState.productsModule.products
  )

  const [ctgs, setCtgs] = useState([])

  useEffect(() => {
    setCtgs(setBrandCtgs())
  }, [products])

  function setBrandCtgs() {
    if (!products || !Array.isArray(products)) return

    const oneWeekAgo = Date.now() - 604800000 // 604800000 ms = 1 week
    const filteredProducts = products.filter((p) => p.createdAt >= oneWeekAgo)

    return filteredProducts.reduce((acc, p) => {
      if (!acc.includes(p.ctg)) acc.push(p.ctg)
      return acc
    }, [])
  }

  return (
    <section className="products-page">
      {ctgs && ctgs.length > 0 && ctgs.map((c) => <ProductList key={c} products={setBrandCtgs} />)}
    </section>
  )
}
