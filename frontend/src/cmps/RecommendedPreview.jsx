import React from 'react'
import { useNavigate } from 'react-router-dom'
import {utilService} from '../services/util.service'

export function RecommendedPreview({ product }) {

    const navigate = useNavigate()

    return (
        <article className='recommended-preview' onClick={() => navigate(`/details/${product._id}`)}>
            <img src={product.url1} alt='Product image'/>
            <h3>{utilService.capFirstLetter(product.brand)}</h3>
            <h4>{product.model}</h4>
        </article>
    )
}
