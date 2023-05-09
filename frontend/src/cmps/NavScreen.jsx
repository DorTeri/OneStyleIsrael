import React from 'react'
import { NavLink } from 'react-router-dom'
import { getSvg } from '../services/svg.service'
import { useSelector } from 'react-redux'
import { HeaderExpand } from './HeaderExpand'
import { eventBus } from '../services/event-bus.service'
import { Loader } from './Loader'

export function NavScreen({ showScreen, setShowScreen }) {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const brands = useSelector((storeState) => storeState.productsModule.brands)

    function openLogin(isLogin) {
        eventBus.emit('show-login', isLogin)
        setShowScreen(false)
    }

    if(!user) return <Loader />
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
                    <NavLink to='/' className='flex align-center space-between'>
                        <span className="featured">New & Featured</span>
                        <span className='arrow-icon'
                            dangerouslySetInnerHTML={{
                                __html: getSvg('arrowRight'),
                            }}>
                        </span>
                    </NavLink>
                    <NavLink to='/adidas' className='flex align-center space-between'>Adidas
                        <span className='arrow-icon'
                            dangerouslySetInnerHTML={{
                                __html: getSvg('arrowRight'),
                            }}>
                        </span>
                        <HeaderExpand ctgs={brands['adidas']} brand={'adidas'} />
                    </NavLink >
                    <NavLink to='/nike' className='flex align-center space-between'>Nike
                        <span className='arrow-icon'
                            dangerouslySetInnerHTML={{
                                __html: getSvg('arrowRight'),
                            }}>
                        </span>
                        <HeaderExpand ctgs={brands['nike']} brand={'nike'} />
                    </NavLink>
                    <NavLink to='/jordan' className='flex align-center space-between'>Jordan
                        <span className='arrow-icon'
                            dangerouslySetInnerHTML={{
                                __html: getSvg('arrowRight'),
                            }}>
                        </span>
                        <HeaderExpand ctgs={brands['jordan']} brand={'jordan'} />
                    </NavLink>
                    <NavLink to='/new balance' className='flex align-center space-between'>New Balance
                        <span className='arrow-icon'
                            dangerouslySetInnerHTML={{
                                __html: getSvg('arrowRight'),
                            }}>
                        </span>
                        <HeaderExpand ctgs={brands['new balance']} brand={'new balance'} />
                    </NavLink>
                </nav>
                <div className='login-section'>
                    <h2>MY ACCOUNT</h2>
                    {!user._id && <button className='sign-in' onClick={() => openLogin(true)}>
                        Sign in
                    </button>}
                    {!user._id && <button className='register' onClick={() => openLogin(false)}>
                        Register
                    </button>}
                    {user && <div className='flex align-center space-between'>
                        <div>
                            <span className="user-icon"
                                dangerouslySetInnerHTML={{
                                    __html: getSvg('user'),
                                }}>
                            </span>
                            <span>
                                {user.accountName}
                            </span>
                        </div>
                        <span className='arrow-icon'
                            dangerouslySetInnerHTML={{
                                __html: getSvg('arrowRight'),
                            }}>
                        </span>
                    </div>
                    }
                </div>
            </div>
            <div className='black-screen' onClick={() => setShowScreen(!showScreen)}>

            </div>
        </section>
    )
}
