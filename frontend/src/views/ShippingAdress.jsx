import React from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { PaymentHeader } from '../cmps/PaymentHeader';
import { CheckoutPreview } from '../cmps/CheckoutPreview';
import { useSelector } from 'react-redux';

export function ShippingAdress() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [userContact, handleChange, setUserContact, handleSubmit, errors] = useForm(
        userService.getEmptyContact(),
        submit,
        () => { }
    )

    function submit() {
        console.log('Added address');
    }

    const { firstName, lastName, address, city, postal, phone } = userContact
    return (
        <section className='shipping-address'>
            <PaymentHeader />
            <h1>Add you delivery address</h1>
            <h4>* Require fields</h4>
            <form>
                <div>
                    <label htmlFor="firstName">First name *</label>
                    <input value={firstName} onChange={handleChange} type="text" name="firstName" id="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last name *</label>
                    <input value={lastName} onChange={handleChange} type="text" name="lastName" id="lastName" />
                </div>
                <div>
                    <label htmlFor="address">Address *</label>
                    <input value={address} onChange={handleChange} type="text" name="address" id="address" />
                </div>
                <div>
                    <label htmlFor="city">City *</label>
                    <input value={city} onChange={handleChange} type="text" name="city" id="city" />
                </div>
                <div>
                    <label htmlFor="postal">Postal or zip code *</label>
                    <input value={postal} onChange={handleChange} type="text" name="postal" id="postal" />
                </div>
                <div>
                    <label htmlFor="phone">Phone *</label>
                    <input value={phone} onChange={handleChange} type="text" name="phone" id="phone" />
                </div>
            </form>
            {user.cart.map(p => <CheckoutPreview product={p}/>)}
        </section>
    )
}
