import React from 'react'
import { useNavigate } from 'react-router-dom'

export function HeaderExpand({ ctgs , brand }) {

    const navigate = useNavigate()

    function doNavigate(ev , ctg) {
        ev.preventDefault()
        navigate(`${brand}/${ctg}`)
    }

    if(!ctgs) return
    return (
        <div className='expand'>
            {ctgs.map(c => <span onClick={(ev) => doNavigate(ev , c)} key={c}>{c}</span>)}
        </div>
    )
}
