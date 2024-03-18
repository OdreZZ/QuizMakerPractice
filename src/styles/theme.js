import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976D2',
        },
        secondary: {
            main: '#FF4081',
        },
        background: {
            default: '#F4F4F4',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    padding: '16px',
                    margin: '16px 8px',
                    justifyContent: 'space-around',
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(25,118,210,0.12)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#ADD8E6',
                    },
                }
            },
        },
    },
});

export default theme;
