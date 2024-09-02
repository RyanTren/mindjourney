'use client'
import "../other.css";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { Container, Typography, CircularProgress, Box, Button } from "@mui/material"
// import { Circ } from "gsap"
import { createTheme } from '@mui/material/styles';

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


const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get("session_id")

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try{
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if(res.ok){
                    setSession(sessionData)
                }
                else{
                    setError(sessionData.error)
                }
            }
            catch(err){
                setError("An error occured")
            }
            finally{
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])


    if(loading){
        return(
            <Container maxWidth="100vw" sx={{textAlign: 'center', mt: 4}}>
                <Box sx={{mt: 10}}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{mt: 2, color: theme.palette.primary.contrastText}}>Loading...</Typography>
                </Box>
            </Container>
        )
    }

    if(error){
        return(
            <Container maxWidth="100vw" sx={{textAlign: 'center', mt: 4}}>
                <Typography variant="h6" sx={{mt: 2, color: theme.palette.primary.contrastText}}>{error}</Typography>
            </Container>
        )
    }
    
    return(
        <Container maxWidth="100vw" sx={{textAlign: 'center', mt: 4}}>

            {
                session.payment_status === "paid" ? (
                    <>
                        <Typography variant="h6" sx={{mt: 2, color: theme.palette.primary.contrastText}}>Success! Your purchase was successful.</Typography>
                        <Box sx={{mt: 22}}>
                            <Typography variant="h6" sx={{color: theme.palette.primary.contrastText}}> Session ID: {session_id}</Typography>
                            <Typography variant="body1" sx={{color: theme.palette.primary.contrastText}}>
                                We have recieved your payment and you can now access the premium features of mindjourney!
                            </Typography>
                            <Button 
                                my={4} 
                                href="/" 
                                sx={{
                                mt: 10,
                                textTransform: 'none',
                                backgroundColor: theme.palette.secondary.light, 
                                color: theme.palette.primary.contrastText, 
                                '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.primary.contrastText,
                                },
                                }}>
                                    Back to Home Page
                            </Button>
                        </Box>
                    </>    
                ) : 
                    <>
                        <Typography variant="h3" sx={{mt: 50, color: theme.palette.secondary.contrastText}}>Payment Failed.</Typography>
                        <Box sx={{mt: 10}}>
                            <Typography variant="body1" sx={{color: theme.palette.primary.contrastText}}>
                                We were unable to process your payment. Please try again later.
                            </Typography>
                            <Button 
                                my={4} 
                                href="/" 
                                sx={{
                                mt: 10,
                                textTransform: 'none',
                                backgroundColor: theme.palette.secondary.light, 
                                color: theme.palette.primary.contrastText, 
                                '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.primary.contrastText,
                                },
                                }}>
                                    Back to Home Page
                            </Button>
                        </Box>
                    </>    
                
            }
        </Container>
    )
}
export default ResultPage