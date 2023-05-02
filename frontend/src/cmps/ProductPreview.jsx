import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { utilService } from '../services/util.service';

export function ProductPreview({ product, onRemoveProduct }) {

    const navigate = useNavigate()
    
    return (
        <article className='product-preview'>
            <div className='product-wrapper' onClick={() => navigate(`/details/${product._id}`)}>
                <img className='product-img img-bottom' src={product.url1} alt='Product image'/>
                <img className='product-img img-top' src={product.url2} alt='Product image'/>
            </div>
            <NavLink to={product.brand} className='brand'>{utilService.capFirstLetter(product.brand)}</NavLink>
            <h4>{product.ctg} {product.model}</h4>
            <div className='price-wrapper flex align-center'>
                <h5>&#8362; <span>{product.price}.00</span></h5>
                <h5>&#8362; <span>{product.prevPrice}.00</span></h5>
            </div>
        </article>
    )
}
