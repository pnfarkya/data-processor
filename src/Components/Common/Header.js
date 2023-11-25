import { Box, Typography, Container } from "@mui/material"


export function Header() {
    return (<>
        <Typography variant="h3"
            noWrap component="a" href="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'sans-serif', letterSpacing: '.3rem', color: 'white', textDecoration: 'none', backgroundColor: "brown" }} >
            Invoice Processor
        </Typography>
    </>)
}