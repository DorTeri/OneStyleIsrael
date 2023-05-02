import React from 'react'
import { RecommendedPreview } from './RecommendedPreview'

export function Recommended({ products }) {
    if(!products) return
    return (
        <section className='recommended-section'>
            <h2>Recommendations</h2>
            <section className='recommended-list'>
                {products.map(p => <RecommendedPreview key={p._id} product={p} />)}
            </section>
        </section>
    )
}
