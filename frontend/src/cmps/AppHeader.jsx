import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { setFilterBy } from '../store/actions/products.actions'
import { getSvg } from '../services/svg.service'
import { NavScreen } from './NavScreen'
import { HeaderExpand } from './HeaderExpand'
// import { productService } from '../services/product.service'
import { eventBus } from '../services/event-bus.service'
import MainFilter from './MainFilter'

export function AppHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const brands = useSelector((storeState) => storeState.productsModule.brands)

  const [showInput, setShowInput] = useState(false)
  const [showScreen, setShowScreen] = useState(false)

  function onNavClick(path) {
    const filterBy = {
      brand: path,
    }
    dispatch(setFilterBy(filterBy))
    navigate(`/${path}`)
  }

  function onSearchClick() {
    setShowInput(true)
  }

  function onCancelClick() {
    setShowInput(false)
  }

  function getCartCount() {
    if (!user) return ''
    else if (user.cart.length) return user.cart.length
  }

  function openUserLogin() {
    if (user._id) navigate(`user/${user._id}`)
    else eventBus.emit('show-login', false)
  }

  return (
    <>
      <div className="new-sale full">מבצעים חדשים נחתו באתר</div>
      <section className="header-section full">
        <NavScreen showScreen={showScreen} setShowScreen={setShowScreen} />
        <section className="header-nav-content">
          <div className="mobile-icons">
            <span
              onClick={() => setShowScreen(!showScreen)}
              className="menu-icon"
              dangerouslySetInnerHTML={{
                __html: getSvg('menu'),
              }}
            />
            <span
              className="search-icon"
              dangerouslySetInnerHTML={{
                __html: getSvg('search'),
              }}
              onClick={onSearchClick}
            />
          </div>
          <h1 className="header-logo" onClick={() => onNavClick('')}>
            ONE STYLE ISRAEL
          </h1>
          <div className="header-icons flex align-center">
            <div className="icon-container" onClick={() => openUserLogin()}>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getSvg('user'),
                }}
              />
            </div>
            <NavLink to="/favorites">
              <div className="icon-container">
                <span
                  className="heart-icon"
                  dangerouslySetInnerHTML={{
                    __html: getSvg('heart'),
                  }}
                />
              </div>
            </NavLink>
            <NavLink to="/cart">
              <div className="icon-container cart">
                <span
                  className="cart-icon"
                  dangerouslySetInnerHTML={{
                    __html: getSvg('cart'),
                  }}
                />
                <span className="cart-count">{getCartCount()}</span>
              </div>
            </NavLink>
          </div>
        </section>
        <div className="header-nav flex align-center justify-center">
          {!showInput ? (
            <nav className="header-links">
              <NavLink to="/newFeatured">
                <span className="featured">New & Featured</span>
              </NavLink>
              <NavLink to="/adidas">
                Adidas
                <HeaderExpand ctgs={brands['adidas']} brand={'adidas'} />
              </NavLink>
              <NavLink to="/nike">
                Nike
                <HeaderExpand ctgs={brands['nike']} brand={'nike'} />
              </NavLink>
              <NavLink to="/jordan">
                Jordan
                <HeaderExpand ctgs={brands['jordan']} brand={'jordan'} />
              </NavLink>
              <NavLink to="/new balance">
                New Balance
                <HeaderExpand
                  ctgs={brands['new balance']}
                  brand={'new balance'}
                />
              </NavLink>
            </nav>
          ) : (
            <MainFilter onCancelClick={onCancelClick} onNavClick={onNavClick} />
            )}
          {!showInput ? (
          <span
            className="search-icon"
            dangerouslySetInnerHTML={{
              __html: getSvg('search'),
            }}
            onClick={onSearchClick}
          />
          ) : null}
        </div>
      </section>

    </>
  )
}
