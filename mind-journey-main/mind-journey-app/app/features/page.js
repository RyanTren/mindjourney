"use client";

import "../other.css";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  isSignedIn,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material/styles";
import FeaturesSectionDemo from "@/components/blocks/features-section-demo-3";
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

export default function Home() {
  const { isLoading, isSignedIn, user } = useUser();

  return (
    <Container
      maxWidth="100vw"
      style={{ padding: 0 }}
      className={jost.className}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
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

      {/* <Box sx={{color: theme.palette.primary.contrastText, padding: 0, margin: 0}}> */}
      <Grid container>
        {/* Importing and using the FeaturesSectionDemo directly */}
        <FeaturesSectionDemo />
      </Grid>
      {/* </Box> */}

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
