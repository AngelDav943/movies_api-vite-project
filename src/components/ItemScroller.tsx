import React, { forwardRef, useEffect, useRef, useState } from 'react'
import './itemScroller.css'
import { ScrollRestoration } from 'react-router-dom';

export default function ({ items = [], reverse = false }: { items: React.JSX.Element[], reverse: boolean }) {
    const [currentView, setView] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    const scrollRef: React.MutableRefObject<any> = useRef();

    useEffect(() => {
        const scroller = scrollRef.current
        if (scroller) {
            const amount = Math.floor(scroller.scrollWidth / scroller.clientWidth)
            setMaxAmount(amount)
            scroller.scrollLeft = (scroller.clientWidth) * Math.max(0, Math.min(currentView, amount))
        }
    }, [[currentView]])

    return (
        <article className={`itemScroller ${reverse ? 'reverse' : ''}`}>
            <button className={`scroll left ${currentView == 0 ? 'hidden' : ''}`} onClick={() => setView(current => Math.max(current - 1, 0))}>&lt;</button>
            <div ref={scrollRef} className='scroller'>
                {Object.keys(items).map(key => (
                    <div key={key} className='container'>
                        {items[key]}
                    </div>
                ))}
            </div>
            <button className={`scroll right ${currentView > (maxAmount - 0.5) ? 'hidden' : ''} `} onClick={() => setView(current => Math.min(current + 1, maxAmount))}>&gt;</button>
        </article>
    )
}
