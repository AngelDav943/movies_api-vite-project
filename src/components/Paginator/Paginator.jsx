import './Paginator.css'

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia } from '@mui/material'

export default function (props) { // current, amount
    const pages = Array.from(Array(props.amount).keys())

    function buttonClick(index) {
        if (props.onClick) props.onClick(index);
    }

    return (
        <Stack justifyContent="center" direction="row" textAlign="center" className='paginator'>
            {pages.map(index => {
                index = index + 1
                let linkclass = ''
                if (index == props.current) linkclass = "selected"

                const distanceCenter = Math.abs(props.current - index)

                if (distanceCenter > 2 && index < pages.length && index > 1) {
                    if (distanceCenter == 3) return <Button disabled key={`${index} ext`} className='extend'>...</Button>
                    linkclass = "hideable"
                }

                // return <a key={index} className={linkclass} href={'./?page=' + index}>{index}</a>
                return <Button key={index} className={linkclass} onClick={() => buttonClick(index)}>{index}</Button>
            })}
        </Stack>
    )
}