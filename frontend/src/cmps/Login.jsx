import React, { useEffect, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { eventBus } from '../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
import { getSvg } from '../services/svg.service'
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
                <div className='login-header flex align-center space-between'>
                <h2>Join us</h2>
                <span
                    onClick={() => closeModal()}
                    className="close-icon"
                    dangerouslySetInnerHTML={{
                        __html: getSvg('x'),
                    }}
                ></span>
                </div>
                <div className='titles-container flex align-center'>
                    <h2 className={`sign-in ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>SIGN IN</h2>
                    <h2 className={`sign-up ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>I'M NEW HERE</h2>
                </div>
                <form onSubmit={submit}>
                    {!isLogin && <><label htmlFor="accountName">Name</label>
                        <input value={accountName} onChange={handleChange} type="text" name="accountName" id="accountName" placeholder='Air Jordan' /></>}
                    <label htmlFor="email">Email address</label>
                    <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder='example@gmail.com' />
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder='*******' />
                    <button>{isLogin ? 'Login' : 'Signup'}</button>
                </form>
            </section>
            <div className='modal-background'></div>
        </>
    )
}
