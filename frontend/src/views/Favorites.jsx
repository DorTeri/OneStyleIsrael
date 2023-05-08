import React from 'react'
import { useSelector } from 'react-redux'
import { eventBus } from '../services/event-bus.service'
import { FavoritesList } from '../cmps/FavoritesList'
import { useNavigate } from 'react-router-dom'

export function Favorites() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    const navigate = useNavigate()

    return (
        <section className='favorites-section'>
            <h2>FAVORITES</h2>
            {!user._id ?
                <div className='favorites-no-user'>
                    <h4>Looking for your favorites? Sign in or create an account to make your first.</h4>
                    <button onClick={() => eventBus.emit('show-login', true)}>Sign In</button>
                </div>
                :
                (
                    !user.favorites.length ?
                        <div className='no-favorites'>
                            <h4>Add you favorite items to your favorites list now.</h4>
                            <button onClick={() => navigate('/')}>Shop Now</button>
                        </div>
                        :
                        <FavoritesList favorites={user.favorites} />
                )
            }
        </section>
    )
}



