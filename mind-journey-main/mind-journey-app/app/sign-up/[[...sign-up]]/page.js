'use client';
import "../../globals.css";

import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { createTheme } from '@mui/material/styles';
import Image from "next/image";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const theme = createTheme({
  typography: {
    fontFamily: 'Jost !important',
    fontWeightLight: 100, 
    fontWeightRegular: 300, 
    fontWeightMedium: 400, 
    fontWeightBold: 500, 
  },
  palette: {
    primary: {
      light: '#403838',
      main: '#181818',
      dark: '#0E0D0D',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#A559D2',
      main: '#7714B0',
      dark: '#5B0B89',
      contrastText: '#F6F4DC',
    },
  },
});


export default function SignUpPage(){
    return(
    <Container maxWidth="100vw">
      <AppBar position="static" sx={{backgroundColor: theme.palette.primary.main, color:theme.palette.primary.contrastText}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr: 1.25 }}>
              <Image src="/moon.svg" alt="logo" width="20" height="20" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link variant="h6" href="/" sx={{color:theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightBold, mr: 2 }}>mindjourney</Link>
            <Typography variant="h6" sx={{color:theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, ml: 1, mr: 2 }}>|</Typography>
            <Button color="inherit" href="features" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>features</Button>
            <Button color="inherit" href="pricing" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>pricing</Button>
            <Button color="inherit" href="contact" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>contact</Button>
          </Box>
          
            <Button color="inherit" href="sign-in" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}> sign in</Button>
 
        </Toolbar>
      </AppBar>


      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{textAlign: 'center', my: 4, gap: 15}}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{textAlign: 'center', gap: 10, color: theme.palette.primary.contrastText}}>
            sign up for mindjourney
        </Typography>
        <SignUp />
      </Box>
    </Container>
    );
}