import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userOrdersList } from '../cmps/userOrdersList'

export function UserDetails() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/')
    }, [])

    if (!user) return
    return (
        <section className='user-details'>
            <h1>Welcome to your account {user.accountName}</h1>
            {user.orders? <userOrdersList orders={user.orders}/> : 'No orders yet'}
        </section>
    )
}
