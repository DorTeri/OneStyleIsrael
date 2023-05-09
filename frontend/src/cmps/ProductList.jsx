import React from 'react'
import { ProductPreview } from './ProductPreview'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service'

export function ProductList({ products, onRemoveProduct, title, toggleFavorites }) {

    const navigate = useNavigate()
    console.log(products ,'from list')

    if (!products) return <div>Loading...</div>
    return (
        <section className='list-wrapper'>
            <h3 onClick={() => navigate(`/${products[0].brand}/${title}`)}>{utilService.capFirstLetter(title)}</h3>
            <section className='products-list'>
                {products.map(p => <ProductPreview key={p._id} product={p} onRemoveProduct={onRemoveProduct} toggleFavorites={toggleFavorites} />)}
            </section>
        </section>
    )
}
