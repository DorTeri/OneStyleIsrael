import React from 'react'
import { FavortiesPreview } from './FavortiesPreview'

export function FavoritesList({ favorites , removeFromFavorites }) {
    return (
        <section className='favorites-list'>
            {favorites.map(f => <FavortiesPreview removeFromFavorites={removeFromFavorites} key={f._id} favorite={f}/>)}
        </section>
    )
}
