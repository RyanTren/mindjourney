'use client';

import "../other.css";

import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";

import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card, Modal, TextField } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { motion } from "framer-motion";

import { Input } from "postcss";

import { firestore } from '@/firebase';
import { getDocs, query, collection, setDoc, doc } from "firebase/firestore";
import db from '@/firebase';

const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House in the woods
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A serene and tranquil retreat, this house in the woods offers a peaceful
          escape from the hustle and bustle of city life.
        </p>
      </div>
    );
  };
   
  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House above the clouds
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Perched high above the world, this house offers breathtaking views and a
          unique living experience. It&apos;s a place where the sky meets home,
          and tranquility is a way of life.
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Greens all over
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Rivers are serene
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house by the river is a place of peace and tranquility. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
   
  const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail:
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail:
        "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail:
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "md:col-span-2",
      thumbnail:
        "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width: "250px",
    color: theme.palette.text.secondary,
  }));

const StyledButton = styled(Button)(({ theme }) => ({
    color: 'white',
    textTransform: 'none',
    textDecoration: 'none',
    border: '2px solid white',
    padding: '12px',
    fontSize: '25px',
    fontWeight: 'thin',
    backgroundColor: 'transparent',
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    zIndex: 100,
    borderRadius: '50%',
    width: 'auto',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'purple',
      borderColor: 'purple',
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
      transform: 'scale(1.05)',
    },
  
    '&:active': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.025)',
    },
}));

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

export default function BlogPage(){
    const {isLoading, isSignedIn, user} = useUser()

    const [page, setPage] = useState(1)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({title: false, content: false});
  
    const [cards, setCards] = useState([])
    const [promptList, setPromptList] = useState([])

    const [cardBackgrounds, setCardBackgrounds] = useState(["/images/Calm-Card-1.jpg", "/images/Calm-Card-2.jpg", "/images/Calm-Card-3.jpg", "/images/Calm-Card-4.jpg", "/images/Calm-Card-5.jpg"])

    const updatePromptList = async () => {
        const snapshot = query(collection(db, 'Entries'));
        const docs = await getDocs(snapshot);
        const inventoryList = [];
      
        docs.forEach((doc) => {
          inventoryList.push({
            name: doc.id,
            ...doc.data(),
          });
        });
      
        setPromptList(inventoryList);
    };

    const createPrompt = async (item) => {
        await setDoc(doc(collection(db, 'Entries'), item.title), {
          content: item.content,
          user: user.id,
        }, { merge: true });
        updatePromptList();
    };

    const handlePageChange = (event, value) => {
      console.log("Page Information: ", event, " ", value)
      setPage(value)
    }

    const createCards = () => {
      const tempList = []

      const firstIndex = ((page - 1) * 8)
      const lastIndex = (firstIndex + 8) 
      const pagePrompts = promptList.slice(firstIndex, lastIndex)

      let counter = 1
      let imageIndex = 0;
      let tempLayout = "md:col-span-2"
      
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

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Client-side only
    }, []);


    return(
    <Container 
        maxWidth="100vw"
        style={{ padding: 0 }}
        className={jost.className}
    >
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
          >
            contact
          </Button>
        </Box>

        {isClient && (
          <>
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
              >
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
              >
                sign up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        )}
      </Toolbar>
    </AppBar>
            
            <StyledButton sx={{position: "fixed", bottom: "16px", right: "16px", zIndex: 100}} onClick={() => {handleOpen()}}>
                +
            </StyledButton>

            <Box width="100vw" height="10vh" sx={{mt: 12, textAlign: "center", position: "flex", alignItems: "center",}}>
                    <Typography variant="h3" color="white" className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">Journal Your Inner Thoughts</Typography>
                    <Typography variant="h5" color="white" className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                        Discover the power of self-reflection. Document your thoughts, emotions, and experiences to gain deeper insights into your mind. Explore the journey within, one entry at a time.
                    </Typography>
            </Box>

            <div className="h-screen py-20 w-full">
            <LayoutGrid cards={cards} />
            </div>
            
           
            <Modal open={open} onClose={handleClose}>
                <Box component="form" position="absolute" top="50%" left="50%" sx={{transform: "translate(-50%, -50%)", borderRadius: 2}} width={800} height={515} bgcolor="white" border="1px solid black" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
                    <Typography>Journal Title</Typography>
                    <TextField required label="Title" value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
                    <Typography>Journal Content:</Typography>
                    <TextField required label="Content" multiline rows={8} value={content} onChange={(e) => setContent(e.target.value)}></TextField>
                    <Button variant="contained" textDecoration="none" textTransform="none" onClick={() => {handleSubmit()}}>Submit</Button>
                </Box>
            </Modal>

            
    </Container>
    )
}