import React, { useState } from 'react'
import './carousel.css'

export default function ({ items = [] }: { items: React.JSX.Element[] }) {
    const [viewAngle, setViewAngle] = useState(0);
    const carouselStyle = { "--total": items.length, "--view": `-${viewAngle}deg` } as React.CSSProperties;

    function handleScroll({ target }) {
        const amount = target.scrollLeft / (target.scrollWidth - target.clientWidth);
        setViewAngle(amount * 360)
    }

    return (
        <section className='carousel' style={carouselStyle}>
            <div className="content">
                {items.map((element, index) => {
                    const style = { "--index": index, "--angle": (Math.PI / 180) * (index) } as React.CSSProperties
                    return <div className='empty' key={index} style={style} >
                        {element}
                    </div>
                })}
            </div>
            <div className="controller" onScroll={handleScroll}>
                {items.map((element, index) => (
                    <div className='empty' key={index} />
                ))}
            </div>
        </section>
    )
}
