import { createTheme, responsiveFontSizes } from '@mui/material';


const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#636cff',
            light: '#838aff',
            dark: '#4952e6',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#ffffff',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#ff1b0b',
        },
        background: {
            default: 'black',
            paper: '#424242',
        },
    },
    typography: {
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif'
    },
});

const mainTheme = responsiveFontSizes(theme);
export default mainTheme;