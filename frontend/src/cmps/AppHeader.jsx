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
  const [query, setQuery] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [showScreen, setShowScreen] = useState(false)

  const headerHeight = showInput ? '35vh' : 'auto'


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

  function getCartCount() {
    if (!user) return ''
    else if (user.cart.length) return user.cart.length
  }

  function getFavoritesCount() {
    if (!user) return ''
    if (!user?._id) return ''
    else if (user.favorites.length) return user.favorites.length
  }

  function openUserLogin() {
    if (user._id) {
      if (user.isAdmin) {
        navigate('/admin')
      } else {
        navigate(`user/${user._id}`)
      }
    } else {
      eventBus.emit('show-login', false)
    }
  }

  function QueryChange(query) {
    console.log(query);
    setQuery(query)
  }

  return (
    <>
      <div className="new-sale full">מבצעים חדשים נחתו באתר</div>
      <section  className={`header-section full ${query !== '' ? 'isInput' : ''}`}>
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
                <span className="favorites-count">{getFavoritesCount()}</span>
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
                <HeaderExpand ctgs={brands['adidas']} brand={'adidas'} setShowScreen={setShowScreen}/>
              </NavLink>
              <NavLink to="/nike">
                Nike
                <HeaderExpand ctgs={brands['nike']} brand={'nike'} setShowScreen={setShowScreen}/>
              </NavLink>
              <NavLink to="/jordan">
                Jordan
                <HeaderExpand ctgs={brands['jordan']} brand={'jordan'} setShowScreen={setShowScreen}/>
              </NavLink>
              <NavLink to="/new balance">
                New Balance
                <HeaderExpand
                  ctgs={brands['new balance']}
                  brand={'new balance'}
                  setShowScreen={setShowScreen}
                />
              </NavLink>
              <NavLink to="/just don">
                Just Don
                <HeaderExpand ctgs={brands['just don']} brand={'just don'} setShowScreen={setShowScreen} />
              </NavLink>
            </nav>
          ) : (
            <MainFilter setShowInput={setShowInput} onNavClick={onNavClick} onSearchQueryChange={QueryChange} />
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
        {showInput && (
          <section className="mobile-main-filter">
            <MainFilter setShowInput={setShowInput} onNavClick={onNavClick} onSearchQueryChange={QueryChange} />
          </section>
        )}
      </section>
      {query !== '' && <div className="filter-modal-background"></div>}
    </>
  )
}
