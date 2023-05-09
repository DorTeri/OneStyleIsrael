import React from 'react'
import { getSvg } from '../services/svg.service'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {utilService} from '../services/util.service'

export function CartPreview({ product , onRemoveProduct }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <section className='cart-preview'>
            <div className='img-wrapper' onClick={() => navigate(`/details/${product._id}`)}>
                <img src={product.url1} alt='Product image'/>
            </div>
            <div className='product-info'>
                <div>
                    <NavLink to={`/${product.brand}`}><h3>{utilService.capFirstLetter(product.brand)}</h3></NavLink>
                    <h4>{product.model}</h4>
                    <h4>Size {product.size}</h4>
                </div>
                <span
                    onClick={ () => onRemoveProduct(product.cartId)}
                    className="trash-icon"
                    dangerouslySetInnerHTML={{
                        __html: getSvg('trash'),
                    }}></span>
            </div>
            <div className='price'>
                <h3><span>&#8362;</span>{product.price}.00</h3>
            </div>
        </section>
    )
}
