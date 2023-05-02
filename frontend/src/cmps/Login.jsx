import React, { useEffect, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { eventBus } from '../services/event-bus.service'
export function Login({ adminLogin }) {

    const [userCred, handleChange, setUserCred] = useForm(userService.getEmptyCred())
    const [showLogin, setShowLogin] = useState(false)
    useEffect(() => {
        eventBus.on('show-login', () => {
            setShowLogin(true)
            document.body.classList.add("no-scroll");
        })
    }, [])

    function doLogin(ev) {
        ev.preventDefault()
        adminLogin(userCred)
    }

    function closeModal() {
        setShowLogin(false)
        document.body.classList.remove("no-scroll");
    }

    const { email, password } = userCred
    console.log(showLogin);
    if (!showLogin) return
    return (
        <>
            <section className='login'>
                <h2>Admin login</h2>
                <form onSubmit={doLogin}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder='example@gmail.com' />
                    <label htmlFor="password">password</label>
                    <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder='*******' />
                    <button>Login</button>
                </form>
                <button onClick={() => closeModal()}>Back</button>
            </section>
            <div className='modal-background'></div>
        </>
    )
}
