import React from 'react'
import { getSvg } from '../services/svg.service'
import { useNavigate } from 'react-router-dom'

export function AdminList({ products , onRemoveProduct}) {

    const navigate = useNavigate()

    return (
        <section className='admin-list'>
            {products.map(p =>
                <article key={p._id} className='admin-product-preview'>
                    <img src={p.url1} alt='Product image'/>
                    <h4>{p.brand}</h4>
                    <h4>{p.model}</h4>
                    <h4>&#8362;{p.price}.00</h4>
                    <div className='actions flex align-center space-between'>
                        <span
                        onClick={() => navigate(`/edit/${p._id}`)}
                            className="edit-icon"
                            dangerouslySetInnerHTML={{
                                __html: getSvg('edit'),
                            }}
                        />
                        <span
                        onClick={() => onRemoveProduct(p._id)}
                            className="trash-icon"
                            dangerouslySetInnerHTML={{
                                __html: getSvg('trash'),
                            }}
                        />
                    </div>
                </article>
            )}
        </section>
    )
}