import React from 'react'
import { FavortiesPreview } from './FavortiesPreview'

export function FavoritesList({ favorites }) {
    return (
        <section className='favorites-list'>
            FavoritesList
            {favorites.map(f => <FavortiesPreview key={f._id} favorite={f}/>)}
        </section>
    )
}
