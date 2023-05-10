import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'

export function PaymentComponent() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [expirationMonth, setExpirationMonth] = useState("")
    const [expirationYear, setExpirationYear] = useState("")
    const [cvv, setCvv] = useState("")

    const [cardInfo, handleChange, setCardInfo, handleSubmit, errors] = useForm(
        userService.getEmptyContact(),
        submit,
        validate
    )

    const [responseMessage, setResponseMessage] = useState("")

    const deliveryPrice = 50

    useEffect(() => {
        setAmount(getTotal())
    }, [])

    function submit() {
        console.log('submit')
    }

    function validate() {
        console.log('validate')
    }

    function getTotal() {
        return user.cart.reduce((acc, p) => {
            acc += p.price
            return acc
        }, 0) + deliveryPrice
    }


    return (
        <section className='payment-section'>
            PaymentComponent
        </section>
    )
}
