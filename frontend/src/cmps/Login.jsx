import React, { useEffect, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { eventBus } from '../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
export function Login({ adminLogin }) {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [userCred, handleChange, setUserCred] = useForm(userService.getEmptyCred())

    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        eventBus.on('show-login', (type) => {
            setShowLogin(true)
            if (!user) {
                setIsLogin(type)
                document.body.classList.add("no-scroll");
            }
        })
    }, [])

    function submit(ev) {
        ev.preventDefault()
        if (isLogin) dispatch(login(userCred))
        else dispatch(signup(userCred))
    }

    function closeModal() {
        setShowLogin(false)
        document.body.classList.remove("no-scroll");
    }

    const { email, password, accountName } = userCred
    if (!showLogin || user) return
    return (
        <>
            <section className='login'>
                <h2>Admin login</h2>
                <form onSubmit={submit}>
                    {!isLogin && <><label htmlFor="accountName">Name</label>
                        <input value={accountName} onChange={handleChange} type="text" name="accountName" id="accountName" placeholder='Air Jordan' /></>}
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder='example@gmail.com' />
                    <label htmlFor="password">password</label>
                    <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder='*******' />
                    <button>{isLogin ? 'Login' : 'Signup'}</button>
                </form>
                <button onClick={() => closeModal()}>Back</button>
            </section>
            <div className='modal-background'></div>
        </>
    )
}
