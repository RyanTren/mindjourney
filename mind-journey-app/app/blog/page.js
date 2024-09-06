'use client'
import "../other.css";
import Image from "next/image";
import {React, useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Jost } from "next/font/google";
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card, Modal, TextField } from "@mui/material";
import { LayoutGrid } from "@/components/ui/layout-grid";
// import { AuroraBackground } from "@/components/ui/aurora-background";
import {firestore} from '@/firebase';
import { Input } from "postcss";
import { getDocs, query, collection, setDoc, doc, getDoc } from "firebase/firestore";
import Pagination from '@mui/material/Pagination';
import { motion } from "framer-motion";
import Link from "next/link";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width: "250px",
    color: theme.palette.text.secondary,
  }));

const StyledButton = styled(Button)({
  color: 'purple',
  textTransform: 'uppercase',
  textDecoration: 'none',
  border: '5px solid purple',
  padding: '10px 20px',
  fontSize: '50px',
  fontWeight: 'bold',
  background: 'transparent',
  position: 'relative',
  transition: 'all 1s',
  overflow: 'hidden',
  cursor: 'pointer',
  borderRadius: "50%",  
  width: "60px",
  height: "60px",

  '&:hover': {
    color: 'white',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: '0%',
    top: '0',
    left: '-40px',
    transform: 'skewX(45deg)',
    backgroundColor: 'purple',
    zIndex: -1,
    transition: 'all 1s',
  },

  '&:hover::before': {
    width: '160%',
  },
})

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




export default function FeedPage(){
    const {isLoading, isSignedIn, user} = useUser()

    const [page, setPage] = useState(1)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({title: false, content: false});
  
    const [cards, setCards] = useState([])
    const [promptList, setPromptList] = useState([])

    const [cardBackgrounds, setCardBackgrounds] = useState(["Calm-Card-1.jpg", "Calm-Card-2.jpg", "Calm-Card-3.jpg", "Calm-Card-4.jpg", "Calm-Card-5.jpg"])



    const updatePromptList = async() => {
      const snapshot = query(collection(firestore, "Entries"));
      const docs = await getDocs(snapshot);
      const inventoryList = []

      docs.forEach((doc) => {
        inventoryList.push({
          name: doc.id,
          ...doc.data(),
        })
      })

      setPromptList(inventoryList)
    }

    const handlePageChange = (event, value) => {
      console.log("Page Information: ", event, " ", value)
      setPage(value)
    }

    const createPrompt = async(item) => {
      await setDoc(doc(collection(firestore, "Entries"), item.title), {content: item.content, user: user.id}, {merge: true})
      updatePromptList()
    }

    const createCards = () => {

      const tempList = []

      const firstIndex = ((page - 1) * 8)
      const lastIndex = (firstIndex + 8) 
      const pagePrompts = promptList.slice(firstIndex, lastIndex)

      let counter = 1
      let imageIndex = 0;
      let tempLayout = "md:col-span-2"
      
      console.log("Rendered")
      pagePrompts.forEach((prompt, index) => {
        counter -= 1
        tempList.push({
          id: (index),
          prompt: prompt,
          content: prompt.content,
          className: tempLayout,
          title: prompt.name,
          user: prompt.user,
          thumbnail:
            cardBackgrounds[imageIndex],
        })
        
        imageIndex += 1

        if(imageIndex > (cardBackgrounds.length - 1))
        {
          imageIndex = 0;
        }
        
        if(counter == 0)
        {
          counter = 2
          if(tempLayout === "md:col-span-2")
            tempLayout = "col-span-1"
          else
            tempLayout = "md:col-span-2"
        }
      })

      setCards(tempList);
    }

    useEffect(() => {
      updatePromptList()
    }, [])

    useEffect(() => {
      console.log("Prompt List: ", promptList)
      createCards()
    }, [promptList])

    useEffect(() => {
      createCards()
    }, [page])



    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = () => {
        const newErrors = {
            title: title.trim() === '',
            content: content.trim() === ''
        }

        setErrors(newErrors)

        if(!newErrors.title && !newErrors.content)
        {
            createPrompt({title: title, content: content})

            setTitle("")
            setContent("")
            setOpen(false)
        }
    }


    return(
        <Box maxWidth="100vw" style={{padding: 0}} className={jost.className} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#181818",
          color: theme.palette.primary.contrastText,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              filter: "invert(1)",
              mr: 1.25,
            }}
          >
            <Image src="/moon.svg" alt="logo" width="20" height="20" />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link
              variant="h6"
              href="/"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
                mr: 2,
              }}
            >
              mindjourney
            </Link>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightLight,
                ml: 1,
                mr: 2,
              }}
            >
              |
            </Typography>
            <Button
              color="inherit"
              href="features"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
              style={{ zIndex: 10000 }}
            >
              features
            </Button>
            <Button
              color="inherit"
              href="pricing"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
              style={{ zIndex: 10000 }}
            >
              pricing
            </Button>
            <Button
              color="inherit"
              href="contact"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
              style={{ zIndex: 10000 }}
            >
              contact
            </Button>
          </Box>

          <SignedOut>
            <Button
              color="inherit"
              href="sign-in"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
              style={{ zIndex: 10000 }}
            >
              {" "}
              sign in
            </Button>
            <Button
              color="inherit"
              href="sign-up"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
              style={{ zIndex: 10000 }}
            >
              {" "}
              sign up
            </Button>
          </SignedOut>
          <SignedIn style={{ zIndex: 10000 }}>
            <UserButton style={{ zIndex: 10000 }} />
          </SignedIn>
        </Toolbar>
      </AppBar>
            
            <Box width="50%" height="200px" sx={{mt: 3}}>
                <div style={{height: "100%"}}>
                    <Typography variant="h3" color="white" className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">
                      Journal Your Inner Thoughts
                    </Typography>

                    <Typography variant="h5" color="white" className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                        Discover the power of self-reflection. Document your thoughts, emotions, and experiences to gain deeper insights into your mind. Explore the journey within, one entry at a time.
                    </Typography>
                </div>
            </Box>
            <StyledButton sx={{position: "fixed", bottom: "16px", right: "16px", zIndex: 100}} onClick={() => {handleOpen()}}>
                +
            </StyledButton>
            {/* <AuroraBackground> */}
              <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
                style={{width: "100%"}}
              >
                <div className="h-screen pt-10 w-full flex flex-col items-center" >
                  <LayoutGrid cards={cards} user={user} updatePromptList={updatePromptList}/>
                  <Pagination count={(Math.ceil(promptList.length/8))} color="secondary" sx={{mb: 3, mt: 3}} onChange={handlePageChange}/>
                </div>
              </motion.div>
            {/* </AuroraBackground> */}
            
           
            <Modal open={open} onClose={handleClose}>
                <Box component="form" position="absolute" top="50%" left="50%" sx={{transform: "translate(-50%, -50%)", borderRadius: 1}} width={800} height={515} bgcolor="white" border="1px solid black" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
                    <Typography>Prompt Title</Typography>
                    <TextField required label="Title" value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
                    <Typography>Prompt Content:</Typography>
                    <TextField required label="Content" multiline rows={8} value={content} onChange={(e) => setContent(e.target.value)}></TextField>
                    <Button variant="contained" onClick={() => {handleSubmit()}}>Submit</Button>
                </Box>
            </Modal>

            
        </Box>
    )
}