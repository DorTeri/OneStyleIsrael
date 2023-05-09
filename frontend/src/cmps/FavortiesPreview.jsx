import React from 'react'
import { ProductPreview } from './ProductPreview'

export function FavortiesPreview({ favorite , removeFromFavorites }) {
    return (
        <ProductPreview product={favorite} removeFromFavorites={removeFromFavorites}/>
    )
}
