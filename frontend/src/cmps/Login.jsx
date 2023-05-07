import React, { useEffect, useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
import { eventBus } from '../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
import { getSvg } from '../services/svg.service'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'

export function Login() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    const [userCred, handleChange, setUserCred, handleSubmit, errors] = useForm(
        userService.getEmptyCred(),
        submit,
        validate
    )

    // google login API
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const [googleUser, setGoogleUser] = useState(null)
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


    // Watching if the googleUser changed so we can fetch the data.
    useEffect(() => {
        async function googleFetch() {
            if (googleUser) {
                try {
                    const res = await axios
                        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                            headers: {
                                Authorization: `Bearer ${googleUser.access_token}`,
                                Accept: 'application/json'
                            }
                        })
                    handleGoogleSubmit(res.data)
                } catch (err) {
                    console.log('error fetching google data' , err)
                }
            }
        }
        googleFetch()
    }, [googleUser])


    function submit(googleUser) {
        if (isLogin) {
            if (googleUser) dispatch(login(googleUser))
            else dispatch(login(userCred))
        }
        else {
            if (googleUser) dispatch(signup(googleUser))
            else dispatch(signup(userCred))
        }
    }

    // Makes a user that fits to my user details from the google info
    function handleGoogleSubmit(user) {
        const newGoogleUser = {
            accountName: user.name,
            email: user.email,
            password: user.id
        }
        submit(newGoogleUser)
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

        if (!isLogin) {
            if (!fields.accountName) {
                errors.accountName = "Name is required"
            } else if (!/^[a-zA-Z_]+$/.test(fields.accountName)) {
                errors.accountName = "Name is invalid , only characters";
            }
        }

        return errors;
    }

    function closeModal() {
        setShowLogin(false)
        document.body.classList.remove("no-scroll");
    }

    const { email, password, accountName } = userCred
    if (!showLogin || user._id) return
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
                <span className='or-auth'>OR</span>
                <button className='btn-google' onClick={() => googleLogin()}>
                    <span className='google-icon'
                        dangerouslySetInnerHTML={{
                            __html: getSvg('google'),
                        }}></span>
                    <span>Continue With Google</span>
                </button>
            </section>
            <div className='modal-background' onClick={() => closeModal()}></div>
        </>
    )
}
