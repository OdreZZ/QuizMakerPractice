import { Button, Container, Divider, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { selectRedirectTo } from "../redux/reducers/navigationReducer";
import { NAVIGATE_SUCCESS } from "../redux/actionTypes";
import { useEffect } from "react";

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirectTo = useSelector(selectRedirectTo);

    useEffect(() => {
        if (redirectTo) {
            navigate(redirectTo);

            dispatch({
                type: NAVIGATE_SUCCESS,
            });
        }
    }, [redirectTo, dispatch, navigate]);

    return (
        <Paper
            elevation={0}
            sx={{
                flexDirection: 'column',
                margin: 0,
                padding: 0,
                paddingTop: 0,
                height: '100vh',
                justifyContent: 'start',
            }}
        >
            <Button
                LinkComponent={Link}
                to='/'
                sx={{ '&:hover': { backgroundColor: '#FFF' } }}
            >
                <img
                    src={'/logo.png'}
                    alt='Logo'
                    style={{
                        width: '320px',
                    }}
                />
            </Button>

            <Divider flexItem />

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Outlet />
            </Container>
        </Paper>
    );
};

export default Layout;