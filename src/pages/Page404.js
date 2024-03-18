import { ChildCare } from "@mui/icons-material";
import { Container, Typography } from "@mui/material"

const Page404 = () => {
    return <>
        <Container
            align='center'
            sx={{ mt: '32px' }}
        >
            <ChildCare sx={{
                width: '50%',
                height: 'auto',
            }} />
        </Container>
        <Typography
            textAlign='center'
            fontSize='36px'
            fontFamily='serif'
        >
            Page not found!
        </Typography>
    </>
};

export default Page404;
