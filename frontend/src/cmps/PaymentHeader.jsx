import React, { useEffect, useState } from 'react'
import { useResolvedPath } from 'react-router-dom'

export function PaymentHeader() {

    const [currPath, setCurrPath] = useState()

    const path = useResolvedPath()

    useEffect(() => {
        setPath()
    }, [path.pathname])

    function setPath() {
        switch (path.pathname) {
            case '/shippingAddress':
                setCurrPath('shipping')
                break;
            case '/payment':
                setCurrPath('payment')
                break;
            case '/review':
                setCurrPath('review')
                break;
            default:
                break;
        }
    }

    return (
        <div className='payment-header'>
            <div className={`active`}>
                <span>1. Delivery</span>
                <div className='bar'></div>
            </div>
            <div className={`${(currPath === 'payment' || currPath === 'review') ? 'active' : ''}`}>
                <span>2. Payment</span>
                <div className='bar'></div>
            </div>
            <div className={`${(currPath === 'review') ? 'active' : ''}`}>
                <span>3. Review</span>
                <div className='bar'></div>
            </div>
        </div >
    )
}