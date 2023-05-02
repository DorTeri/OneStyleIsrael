import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export function Loader() {
    return (
        <section className='loader'>
            <ThreeCircles
                height="100"
                width="100"
                color="#222222"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </section>
    )
}
