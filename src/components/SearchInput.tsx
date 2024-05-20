import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { styled, InputBase, alpha, Theme } from '@mui/material';

export const SearchDiv = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

interface IconWrapperProps {
    theme: Theme,
    float: floatState,
    pointer: boolean
}

type floatState = 'left' | 'right';
export const SearchIconWrapper = styled('div')(({ theme, float = 'left', pointer = false }: IconWrapperProps) => {

    let extra = {}
    if (float == 'left') extra['left'] = '0'
    if (float == 'right') extra['right'] = '0'
    if (pointer) extra['cursor'] = 'pointer'

    return {
        ...extra,
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: `calc(100% - ${theme.spacing(4)} - 1em)`,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));