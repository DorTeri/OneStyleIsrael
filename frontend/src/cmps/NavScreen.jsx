import React from 'react'
import { NavLink } from 'react-router-dom'
import { getSvg } from '../services/svg.service'
import { useSelector } from 'react-redux'
import { HeaderExpand } from './HeaderExpand'
import { eventBus } from '../services/event-bus.service'

export function NavScreen({ showScreen, setShowScreen }) {

    const brands = useSelector((storeState) => storeState.productsModule.brands)

    function openLogin(isLogin) {
        eventBus.emit('show-login' , isLogin)
        setShowScreen(false)
    }

    return (
        <section className={`nav-screen ${showScreen ? 'open' : ''}`}>
            <div className='nav-content'>
                <div className='nav-content-header flex align-center space-between'>
                    <h2>ONE STYLE ISRAEL</h2>
                    <span
                        className="x-icon"
                        dangerouslySetInnerHTML={{
                            __html: getSvg('x'),
                        }}
                        onClick={() => setShowScreen(false)}
                    />
                </div>
                <nav className="header-links">
                    <NavLink to='/'>
                        <span className="featured">New & Featured</span>
                    </NavLink>
                    <NavLink to='/adidas'>Adidas
                    <HeaderExpand ctgs={brands['adidas']} brand={'adidas'}/>
                    </NavLink>
                    <NavLink to='/nike'>Nike
                    <HeaderExpand ctgs={brands['nike']} brand={'nike'}/>
                    </NavLink>
                    <NavLink to='/jordan'>Jordan
                    <HeaderExpand ctgs={brands['jordan']} brand={'jordan'}/>
                    </NavLink>
                    <NavLink to='/new balance'>New Balance
                    <HeaderExpand ctgs={brands['new balance']} brand={'new balance'}/>
                    </NavLink>
                    <NavLink to='/sale' className="sale">
                        Sale
                    </NavLink>
                </nav>
                <div className='login-section'>
                    <h2>MY ACCOUNT</h2>
                    <button className='sign-in' onClick={() => openLogin(true)}>
                        Sign in
                    </button>
                    <button className='register' onClick={() => openLogin(false)}>
                        Register
                    </button>
                </div>
            </div>
            <div className='black-screen' onClick={() => setShowScreen(!showScreen)}>

            </div>
        </section>
    )
}
