"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";

import "../other.css";

import db from "@/firebase";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  writeBatch,
  memoryEagerGarbageCollector,
} from "firebase/firestore";

import {
  SignedIn,
  SignedOut,
  isSignedIn,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import { Jost } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const theme = createTheme({
  typography: {
    fontFamily: "Jost !important",
    fontWeightLight: 100,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 500,
  },
  palette: {
    primary: {
      light: "#403838",
      main: "#573F66",
      dark: "#3F1658",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#588DE2",
      main: "#3B68B0",
      dark: "#0B367C",
      contrastText: "#F6F4DC",
    },
  },
});
const sendIcon = "/images/send.png";

export default function Chat() {
  const { isLoading, isSignedIn, user } = useUser();
  const [membership, setMembership] = useState("Free");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to mindjourney! I'm Aeryn, your personal AI Companion, here to help you get through your day. Ask me anything and I'll try my best to help you out. What's on your mind today?",
    },
  ]);

  useEffect(() => {
    if (!user?.id) {
      return; // Exit early if user.id is not available
    }

    const checkMembership = async () => {
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);
      setMembership(docSnap.data().membershipStatus);
      console.log("Membership Status: ", membership);
    };

    checkMembership();
  }, [user, membership]);

  // Handle cases where user is not signed in or still loading
  if (isLoading) {
    return (
      <Typography
        variant="h5"
        my={50}
        sx={{
          position: "relative",
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        color="white"
      >
        <CircularProgress />
        Loading...
      </Typography>
    );
  }

  if (!isSignedIn) {
    return (
      <Container
        maxWidth="100vw"
        sx={{ color: theme.palette.primary.contrastText }}
      >
        <AppBar
          position="static"
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
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
        <Typography
          variant="h5"
          my={50}
          sx={{
            position: "relative",
            textAlign: "center",
            alignContent: "center",
            alignItems: "center",
          }}
          color="white"
        >
          You must be signed in to talk to Aeryn.
        </Typography>
      </Container>
    );
  }

  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages

    // Function to check if a string contains only ASCII characters
    const isAscii = (str) => /^[\x00-\x7F]*$/.test(str);

    // Check if the message contains only ASCII characters
    if (!isAscii(message)) {
      console.error("Error: Only ASCII characters are allowed.");
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: "Error: Only ASCII characters are allowed.",
        },
      ]);
      setMessage(""); //Clears the input field to get rid of non-ASCII characters
      return;
    }

    // Count the number of unique users
    const userRoles = messages.filter((msg) => msg.role === "user");
    const uniqueUsers = new Set(userRoles.map((msg) => msg.userId)).size;

    // Check if there are already two users
    if (uniqueUsers >= 2) {
      console.error("Error: Only two users are allowed.");
      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: "Error: Only two users are allowed." },
      ]);
      return;
    }

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/ai_companion_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  };

  return (
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

      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
          width: "100vw",
        }}
      >
        <Box>
          <h1 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            {" "}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">Introducing Aeryn</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">Introducing Aeryn</span>
              </div>
            </div>
          </h1>

          <h3 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            <div>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.main,
                  fontFamily: jost.style.fontFamily,
                  fontWeight: theme.typography.fontWeightRegular,
                }}
              >
                Your Personal AI Companion, powered by OpenAI GPT 3.5 Turbo |
                Free Users
              </Typography>
            </div>
          </h3>
        </Box>
      </Grid>

      <Box>
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            sx={{
              boxShadow: 3,
              borderRadius: 4,
            }}
            direction={"column"}
            width="80vw"
            height="80vh"
            p={2}
            spacing={3}
          >
            <Stack
              // direction={'column'}
              // spacing={2}
              // flexGrow={1}
              // overflow="auto"
              // maxHeight="100%"
              className="scrollable"
              direction={"column"}
              spacing={2}
              flexGrow={1}
              overflow="auto"
              maxHeight="100%"
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    bgcolor={
                      message.role === "assistant"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main
                    }
                    sx={{
                      borderRadius: 6,
                      color: theme.palette.secondary.contrastText,
                    }}
                    color="white"
                    p={2}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <TextField
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.contrastText,
                  borderRadius: 2,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <AccountCircle /> */}
                    </InputAdornment>
                  ),
                }}
                id="filled-basic"
                variant="filled"
                label="Message Aeryn"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <Button
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  color: theme.palette.primary.contrastText,
                  fontSize: 25,
                  borderRadius: 2,
                }}
                variant="contained"
                onClick={sendMessage}
              >
                <Image src={sendIcon} alt="logo" width="20" height="20" />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <footer>
        <Divider variant="middle" sx={{ backgroundColor: "white" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            color: theme.palette.secondary.contrastText,
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "column",
              alignItems: "center",
              filter: "invert(1)",
              mr: "2",
            }}
            margin={10}
          >
            <Image
              src="/moon.svg"
              alt="logo"
              width="20"
              height="20"
              sx={{ mr: "2" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
                mr: 2,
                filter: "invert(1)",
              }}
            >
              mindjourney
            </Typography>

            {/* Description Section */}
            <Box marginBottom={2}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: jost.style.fontFamily,
                  fontWeight: "regular",
                  textAlign: "center",
                  color: "black",
                }}
              >
                formed by a group of college kids trying to make it through life
              </Typography>
            </Box>

            {/* Social Links Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                filter: "invert(1)",
              }}
            >
              {[
                {
                  name: " ryan tran",
                  url: "https://www.linkedin.com/in/ryantren/",
                },
                {
                  name: " mason moses",
                  url: "https://www.linkedin.com/in/mason-moses/",
                },
                {
                  name: " jeremiah dawson",
                  url: "https://www.linkedin.com/in/jeremiah-dawson-2644982a2/",
                },
                {
                  name: " nabit karowadia",
                  url: "https://www.linkedin.com/in/nabit-karowadia-848376224/",
                },
              ].map((link) => (
                <Link
                  key={link.name}
                  color="inherit"
                  href={link.url}
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    fontFamily: jost.style.fontFamily,
                    fontWeight: "light",
                    textTransform: "none",
                    marginBottom: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/linkedin.svg"
                    alt="logo"
                    width="18"
                    height="18"
                    style={{ marginRight: "8px", filter: "invert(1)" }}
                  />
                  {link.name}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Navigation Links Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginRight: 10,
              gap: 2,
            }}
          >
            {[
              { name: "features", path: "http://localhost:3000/features" },
              { name: "pricing", path: "http://localhost:3000/pricing" },
              {
                name: "github",
                path: "https://github.com/MasonMos/mind-journey",
              },
              { name: "contact", path: "http://localhost:3000/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                color="inherit"
                href={link.path}
                sx={{
                  color: "white",
                  fontFamily: jost.style.fontFamily,
                  fontWeight: "light",
                  textTransform: "none",
                  marginBottom: 1,
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        </Box>
      </footer>
    </Container>
  );
}
