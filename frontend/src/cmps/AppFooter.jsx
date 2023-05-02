import React from 'react'
import { getSvg } from '../services/svg.service'

export function AppFooter() {
    return (
        <section className='app-footer full'>
            <h2>ONE STYLE ISRAEL</h2>
            <div className='follow flex align-center'>
                <h3>Follow us</h3>
                <a href='https://www.instagram.com/onestyle.israel/'
                    className="insta-icon"
                    dangerouslySetInnerHTML={{
                        __html: getSvg('insta'),
                    }} />
                <a
                    href=''
                    className="whatsapp-icon"
                    dangerouslySetInnerHTML={{
                        __html: getSvg('whatsapp'),
                    }}>
                </a>
            </div>
            <div>

            </div>
            <small>&#169; Copyright 2023 ONE STYLE ISRAEL. All rights reserved</small>
        </section>
    )
}
