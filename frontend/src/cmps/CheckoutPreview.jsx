import React from 'react'

export function CheckoutPreview({ product }) {
    return (
        <article className='checkout-preview flex align-center space-between'>
            <img src={product.url1} />
            <span>&#8362;{product.price}.00</span>
        </article>
    )
}
