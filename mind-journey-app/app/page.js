"use client";

import "./globals.css";

import Head from "next/head";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  isSignedIn,
  user,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material/styles";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase";

import { HoverEffect } from "@/components/ui/card-hover-effect"; //acternity card hover effect
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"; //acternity sticky scroll reveal
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

import { Jost } from "next/font/google";
import Link from "next/link";

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
      main: "#181818",
      dark: "#0E0D0D",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#A559D2",
      main: "#7714B0",
      dark: "#5B0B89",
      contrastText: "#F6F4DC",
    },
  },
});

//aceternity features
const content = [
  {
    title: "24/7 AI-Powered Chat Companion",
    description:
      "Receive regular emotional check-ins from our AI, designed to understand your feelings and provide immediate, tailored responses. Whether you're feeling anxious, stressed, or down, our AI is here to listen and offer the right guidance.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Link href="/features">Learn More</Link>
      </div>
    ),
  },
  {
    title: "Personalized Mental Health Plans",
    description:
      "Get access to customized mental health plans based on your unique needs and goals. Our AI analyzes your interactions and feedback to create a plan that evolves with you, ensuring you always have the right tools and support.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          // src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
          href="/features"
        />
      </div>
    ),
  },
  {
    title: "Guided Meditation and Relaxation Techniques",
    description:
      "Explore a library of guided meditations and relaxation exercises that help reduce stress and promote mindfulness. Tailored to your emotional state, these sessions provide a calming experience to help you manage daily challenges.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <Link href="/features">Learn More</Link>
      </div>
    ),
  },
  {
    title: "AI-Powered Journaling and Mood Tracking",
    description:
      "Keep track of your mental health journey with AI-driven journaling and mood tracking. Our platform helps you reflect on your emotions, identify patterns, and gain insights into your mental well-being over time.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Link href="/features">Learn More</Link>
      </div>
    ),
  },
];

//aceternity pricing cards
export const pricingCards = [
  {
    title: "Basic Plan (Free)",
    description:
      "Access to introductory mental health resources. Limited AI-guided self-help tools. Community support through forums.",
    link: "/pricing",
  },
  {
    title: "Enhanced Plan ($5)",
    description:
      "Everything in Basic Support. Personalized AI mental health assessments. Access to guided meditation and relaxation techniques. Monthly progress tracking and reports.",
    link: "/pricing",
  },
  {
    title: "Premium Plan ($10)",
    description:
      "Everything in Enhanced Care. 24/7 access to AI-driven emotional support. Customized mental health plans tailored to your needs. Exclusive content and workshops from mental health professionals.",
    link: "/pricing",
  },
];

export default function Home() {
  const { isLoading, isSignedIn, user } = useUser();
  const [email, setEmail] = useState("");

  // Create a function that stores the user's email in Firestore
  const addEmail = async (email) => {
    try {
      // Check if the email already exists in Firestore
      const querySnapshot = await getDocs(
        query(collection(db, "waitlist"), where("email", "==", email))
      );

      if (!querySnapshot.empty) {
        // Email already exists
        window.alert("This email is already on the waitlist.");
        return;
      }

      // Add the email to Firestore
      const docRef = await addDoc(collection(db, "waitlist"), {
        email: email,
        timestamp: new Date(),
      });
      console.log("Email added to Firestore with ID: ", docRef.id);
      window.alert("You have successfully joined the waitlist!");
    } catch (error) {
      console.error("Error adding document: ", error);
      window.alert("Error adding you to the waitlist!");
    }
  };

  // Use a fallback UI for the initial render to ensure consistency
  if (typeof window === "undefined") {
    return <div>Loading...</div>; // server-side rendering fallback
  }

  if (isLoading) {
    return <div>Loading...</div>; // client-side loading state
  }

  return (
    <Container
      maxWidth="100vw"
      style={{ padding: 0 }}
      className={jost.className}
    >
      <Head maxWidth="100vw">
        <title>mindjourney</title>
        <meta name="description" content="AI-powered mental health" />
      </Head>
      
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            alignItems: 'center',
            '@media (max-width: 600px)': {
              padding: '0 4px', // Adjust padding for smaller screens
            },
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              filter: 'invert(1)',
              mr: 1,
              flexShrink: 0, // Prevents shrinking of the logo
            }}
          >
            <Image src="/moon.svg" alt="logo" width="15" height="15" />
          </Box>

          {/* Title and Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
              '@media (max-width: 600px)': {
                flexGrow: 0,
                fontSize: '0.7rem', // Smaller font size for mobile
                flexBasis: 'auto', // Allow the box to shrink to its contents
              },
            }}
          >
            <Link
              variant="h6"
              href="/"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
                mr: 1,
                fontSize: {
                  xs: '0.5rem',
                  sm: '1rem',
                },
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
                mx: 1,
                fontSize: {
                  xs: '0.5rem',
                  sm: '1rem',
                },
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
                textTransform: 'none',
                fontSize: {
                  xs: '0.5rem',
                  sm: '0.9rem',
                },
                px: 0, // Reduced padding
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
                textTransform: 'none',
                fontSize: {
                  xs: '0.5rem',
                  sm: '0.9rem',
                },
                px: 0, // Reduced padding
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
                textTransform: 'none',
                fontSize: {
                  xs: '0.5rem',
                  sm: '0.9rem',
                },
                px: 0, // Reduced padding
              }}
            >
              contact
            </Button>
          </Box>

          {/* Sign In/Sign Up Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '@media (max-width: 600px)': {
                fontSize: '0.7rem', // Smaller font size for mobile
              },
            }}
          >
            <SignedOut>
              <Button
                color="inherit"
                href="sign-in"
                sx={{
                  color: theme.palette.primary.contrastText,
                  fontFamily: jost.style.fontFamily,
                  fontWeight: theme.typography.fontWeightRegular,
                  textTransform: 'none',
                  fontSize: {
                    xs: '0.5rem',
                    sm: '0.9rem',
                  },
                  px: 0, // Reduced padding
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
                  textTransform: 'none',
                  fontSize: {
                    xs: '0.5rem',
                    sm: '0.9rem',
                  },
                  px: 0, // Reduced padding
                }}
              >
                sign up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton sx={{ zIndex: 10000 }} />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>



      <ShootingStars />
      <StarsBackground />

      {/* Hero Statement */}
      <Grid margin={10}>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="text-white flex items-center space-x-4"
        >
          <span>Introducing New AI Technology</span>
        </HoverBorderGradient>

        <Box
          sx={{
            color: theme.palette.primary.contrastText,
            padding: 0,
            margin: 0,
          }}
        >
          <HeroHighlight>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-regular text-neutral-700 text-white light:text-white max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl leading-snug md:leading-relaxed mx-auto px-4 sm:px-6 md:px-8"
            >
              Make a{" "}
              <Highlight className="text-white dark:text-white">
                life changing
              </Highlight>{" "}
              <br />
              difference with
              <br />
              your health
            </motion.h1>
          </HeroHighlight>

          <Typography variant="h7">
            Our AI-driven mental health support is here to provide a lifeline,
            offering
            <br /> understanding, compassion, and guidance when you need it
            most.
            <br />
          </Typography>
        </Box>

        <Box
          marginTop={2}
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            gap: 2,
          }}
        >
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="text-white flex items-center space-x-4"
          >
            <Link href="/features">Browse Features</Link>
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="text-white flex items-center space-x-4"
          >
            <Link href="/pricing">Pricing Plans</Link>
          </HoverBorderGradient>
        </Box>
      </Grid>

      {/* Features Section */}
      <Grid margin={10} spacing={10} gap="15" ml="10">
        <Typography variant="h4" color={theme.palette.secondary.contrastText}>
          Features
        </Typography>
        <StickyScroll content={content} />
      </Grid>

      {/* Waitlist Section */}
      <Box
        height="40vh"
        width="80vw"
        margin="auto"
        sx={{
          backgroundColor: "black", // Light background color for better contrast
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          mb: 10, // Added margin-bottom to create space below the component
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: theme.palette.secondary.contrastText,
          }}
        >
          Join the Waitlist
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: "400px",
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.secondary.contrastText, // Light border color
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.secondary.contrastText, // Darker border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.secondary.contrastText, // Primary color for focused border
              },
              "& input": {
                color: theme.palette.secondary.contrastText,
                fontFamily: "Arial, sans-serif",
              },
            },
          }}
          InputLabelProps={{
            style: { color: theme.palette.secondary.contrastText },
            fontFamily: "Arial, sans-serif",
          }}
        />

        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="flex items-center justify-center px-4 py-1 mt-1"
          onClick={() => addEmail(email)}
          sx={{
            color: theme.palette.secondary.contrastText,

          }}
        >
          Submit
        </HoverBorderGradient>
      </Box>

      {/* Pricing Card Preview */}
      <Grid margin={10} spacing={10} gap="15" ml="10">
        <Typography variant="h4" color={theme.palette.secondary.contrastText}>
          Pricing
        </Typography>
        <HoverEffect
          items={pricingCards}
          sx={{
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.primary.dark,
          }}
        />
      </Grid>

      {/* need to work on foot to match the styling on figma */}
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
