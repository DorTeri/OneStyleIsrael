import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PaymentHeader } from '../cmps/PaymentHeader'

export function PaymentComponent() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    const [amount, setAmount] = useState('')

    const deliveryPrice = 50

    useEffect(() => {
        setAmount(getTotal())
    }, [])

    function getTotal() {
        return user.cart.reduce((acc, p) => {
            acc += p.price
            return acc
        }, 0) + deliveryPrice
    }


    return (
        <section className='payment-section'>
            <PaymentHeader />
            <h2>CARD DETAILS</h2>
            <iframe src="https://sandbox.meshulam.co.il/payment-form?apiKey=[your_api_key]&subscriptionId=[your_subscription_id]&email=[customer_email]&amount=[transaction_amount]" width="100%" height="800" frameborder="0"></iframe>
        </section>
    )
}
