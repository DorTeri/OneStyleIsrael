import React from 'react'
import { useForm } from '../customHooks/useForm'
import { userService } from '../services/user.service'
export function Login({ adminLogin }) {

    const [userCred, handleChange, setUserCred] = useForm(userService.getEmptyCred())

    function doLogin(ev) {
        ev.preventDefault()
        adminLogin(userCred)
    }

    const { email, password } = userCred
    return (
        <section className='login'>
            <h2>Admin login</h2>
            <form onSubmit={doLogin}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder='example@gmail.com' />
                <label htmlFor="password">password</label>
                <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder='*******'/>
                <button>Login</button>
            </form>
        </section>
    )
}
