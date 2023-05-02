import React, { useEffect, useState } from 'react'
import { SHOW_MSG, eventBus } from '../services/event-bus.service'
import { getSvg } from '../services/svg.service'

export function UserMsg() {

    const [msg, setMsg] = useState('')

    useEffect(() => {
        eventBus.on(SHOW_MSG, (msg) => {
            setMsg(msg)
            setTimeout(() => {
                setMsg('')
            }, 3000);
        })
    }, [])
    return (
        <section className={`user-msg flex align-center ${msg && msg.type}`}>
            {msg.type === 'success' && <span className="v-icon"
                dangerouslySetInnerHTML={{
                    __html: getSvg('v'),
                }}></span>}
            {msg.type === 'error' && <span className="x-icon"
                dangerouslySetInnerHTML={{
                    __html: getSvg('x'),
                }}></span>}
            <span>{msg?.txt}</span>
        </section>
    )
}
