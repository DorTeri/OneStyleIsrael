import React from 'react'

export function CheckoutPreview({ product }) {
    return (
        <article className='checkout-preview flex align-center space-between'>
            <img src={product.url1} />
            <h4>{product.price}</h4>
        </article>
    )
}
