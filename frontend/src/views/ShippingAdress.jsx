import React from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { PaymentHeader } from '../cmps/PaymentHeader';
import { CheckoutPreview } from '../cmps/CheckoutPreview';
import { useDispatch, useSelector } from 'react-redux';
import { getSvg } from '../services/svg.service'
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../store/actions/user.actions';

export function ShippingAdress() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [userContact, handleChange, setUserContact, handleSubmit, errors] = useForm(
        userService.getEmptyContact(),
        addUserContact,
        validate
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deliveryPrice = 50

    function addUserContact() {
        const userToUpdate = JSON.parse(JSON.stringify(user))
        userToUpdate.contact = userContact
        dispatch(updateUser(userToUpdate))
        // navigate('')
    }

    function getTotal() {
        return user.cart.reduce((acc, p) => {
            acc += p.price
            return acc
        }, 0) + deliveryPrice
    }

    function validate(fields) {
        const errors = {};

        if (!fields.firstName) {
            errors.firstName = "First name is required"
        } else if (!/^[a-zA-Z]+$/.test(fields.firstName)) {
            errors.firstName = "Name is invalid , only characters";
        }

        if (!fields.lastName) {
            errors.lastName = "Last name is required"
        } else if (!/^[a-zA-Z]+$/.test(fields.lastName)) {
            errors.lastName = "Name is invalid , only characters";
        }

        if (!fields.address) {
            errors.address = "Address is required"
        } else if (!/^[a-zA-Z0-9\s]+$/.test(fields.address)) {
            errors.address = "Address is invalid , only characters and numbers";
        }

        if (!fields.city) {
            errors.city = "City is required"
        } else if (!/^[a-zA-Z]+$/.test(fields.city)) {
            errors.city = "City is invalid , only characters";
        }

        if (!fields.postal) {
            errors.postal = "Postal is required"
        } else if (!/^[0-9]+$/.test(fields.postal)) {
            errors.postal = "Postal is invalid , only numbers";
        }

        if (!fields.phone) {
            errors.phone = "Phone is required"
        } else if (!/^[0-9]+$/.test(fields.phone)) {
            errors.phone = "Phone is invalid , only numbers";
        }

        return errors;
    }

    const { firstName, lastName, address, city, postal, phone } = userContact
    if (!user) return
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
            <div className='summary'>
                <h2>Summary</h2>
                {user.cart.map(p => <CheckoutPreview key={p._id} product={p} />)}
                <div className='delivery flex align-center space-between'>
                    <span>Delivery</span>
                    <span>&#8362;{deliveryPrice}</span>
                </div>
                <div className='total flex align-center space-between'>
                    <span>Total</span>
                    <span>&#8362;{getTotal()}</span>
                </div>
            </div>
            <button className='btn-submit flex align-center' onClick={handleSubmit}>
                <span>Save and continue</span>
                <span dangerouslySetInnerHTML={{
                    __html: getSvg('arrowRight'),
                }}>
                </span>
            </button>
        </section>
    )
}
