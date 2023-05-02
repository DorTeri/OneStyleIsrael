import React from 'react'
import { useNavigate } from 'react-router-dom'

export function RecommendedPreview({ product }) {

    const navigate = useNavigate()

    return (
        <article className='recommended-preview' onClick={() => navigate(`/details/${product._id}`)}>
            <img src={product.url1} alt='Product image'/>
            <h4>{product.brand}</h4>
            <h4>{product.model}</h4>
        </article>
    )
}
