import React, { useEffect, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { eventBus } from '../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
import { getSvg } from '../services/svg.service'
export function Login() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [userCred, handleChange, setUserCred, handleSubmit, errors] = useForm(
        userService.getEmptyCred(),
        submit,
        validate
    )

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

    useEffect(() => {
        if (user) closeModal()
    }, [user])

    function submit() {
        if (isLogin) dispatch(login(userCred))
        else dispatch(signup(userCred))
    }

    function validate(fields) {
        const errors = {};

        if (!fields.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
            errors.email = "Email is invalid";
        }

        if (!fields.password) {
            errors.password = "Password is required";
        } else if (fields.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        if (!fields.accountName) {
            errors.accountName = "Name is required"
        } else if (!/^[a-zA-Z_]+$/.test(fields.accountName)) {
            errors.accountName = "Name is invalid , only characters";
        }

        return errors;
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
                <form onSubmit={handleSubmit}>
                    {!isLogin && <><label htmlFor="accountName">Name</label>
                        <input value={accountName} onChange={handleChange} type="text" name="accountName" id="accountName" placeholder='Air Jordan' /></>}
                    {!isLogin && errors.accountName && <span className='error'>{errors.accountName}</span>}
                    <label htmlFor="email">Email address</label>
                    <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder='example@gmail.com' />
                    {!isLogin && errors.email && <span className='error'>{errors.email}</span>}
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder='*******' />
                    {!isLogin && errors.password && <span className='error'>{errors.password}</span>}
                    <button>{isLogin ? 'Login' : 'Signup'}</button>
                </form>
            </section>
            <div className='modal-background'></div>
        </>
    )
}
