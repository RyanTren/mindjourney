"use client";

import "../other.css";

import { Jost } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import db from "@/firebase";

import getStripe from "@/utils/get-stripe";

import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/nextjs";

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

import { BackgroundGradient } from "@/components/ui/background-gradient";

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

const sections = [
  {
    title: "Introduction",
    content:
      "Welcome to Mindjorney! By subscribing to our membership plans, you agree to these terms and conditions. Please read them carefully.",
  },
  {
    title: "Membership Plans",
    content:
      "We offer different membership plans, each with its own features and benefits. Memberships are billed on a monthly basis, with the option to upgrade or downgrade at any time.",
  },
  {
    title: "Billing and Payments",
    content:
      "Payments for membership plans are processed through our secure payment gateway. Your membership will automatically renew each month unless you cancel it. If payment is unsuccessful, your membership will be suspended until payment is received.",
  },
  {
    title: "Cancellations and Refunds",
    content:
      "You can cancel your membership at any time through your account settings. Upon cancellation, your membership benefits will continue until the end of the current billing cycle. We do not offer refunds for partial months.",
  },
  {
    title: "Use of Services",
    content:
      "Our services are for personal use only. Sharing accounts or access with others is not allowed. You agree to use Mindjorney responsibly and in accordance with all applicable laws and regulations.",
  },
  {
    title: "Privacy",
    content:
      "We are committed to protecting your privacy. Please review our Privacy Policy to understand how we handle your personal information.",
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these terms and conditions from time to time. Changes will be effective immediately upon posting on our website. By continuing to use our services after changes are made, you agree to the revised terms.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions or concerns about these terms and conditions, please contact us at [insert contact email].",
  },
];

const handleSubmit = async () => {
  const checkoutSession = await fetch("/api/checkout_session", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
    },
    body: JSON.stringify({ userId: user.id }),
  });

  const checkout_session = await checkoutSession.json();

  if (checkoutSession.statusCode === 500) {
    console.error(checkoutSession.message);
    return;
  }

  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({
    sessionId: checkout_session.id,
  });

  if (error) {
    console.warn(error.message);
  }
};

export default function Home() {
  const [membershipStatus, setMembershipStatus] = useState("Free");
  const { isLoading, isSignedIn, user } = useUser();
  const router = useRouter();

  const handleProceed = async () => {
    if (!isSignedIn) {
      alert("Please sign in to continue.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.id);

      await setDoc(
        userDocRef,
        {
          membershipStatus: membershipStatus,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    alert("You are now a free member!.");
    router.push("/features");
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

      <Box
        sx={{
          color: theme.palette.primary.contrastText,
          padding: 0,
          margin: 0,
        }}
      >
        <Typography
          variant="h2"
          className={jost.className}
          sx={{
            postion: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Pricing Options
        </Typography>
      </Box>

      {/* pricing cards */}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          margin={10}
          spacing={10}
          gap={10}
          mr={10}
          ml={10}
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900">
            <Image
              src={`/moonpriceone.webp`}
              alt="moon-one"
              height="400"
              width="400"
              className="object-contain"
              style={{ filter: "brightness(200%) grayscale(100%)" }}
            />
            <p className="text-base sm:text-xl text-white mt-4 mb-2 dark:text-neutral-200">
              Basic <br />
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Access to introductory mental health resources. <br />
              Limited AI-guided self-help tools. <br />
              Community support through forums. <br />
            </p>
            <div className="flex items-center justify-center">
              <button
                className="rounded-full pl-6 pr-3 py-3 text-white flex items-center justify-center space-x-1 bg-black mt-8 text-xs font-bold dark:bg-zinc-800"
                onClick={handleProceed}
              >
                <span>Buy now </span>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  Free
                </span>
              </button>
            </div>
          </BackgroundGradient>
        </Grid>

        <Grid
          item
          margin={10}
          spacing={10}
          gap={10}
          mr={10}
          ml={10}
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900">
            <Image
              src={`/moonpricetwo.webp`}
              alt="moon-two"
              height="400"
              width="400"
              className="object-contain"
              style={{ filter: "brightness(200%) grayscale(100%)" }}
            />
            <p className="text-base sm:text-xl text-white mt-4 mb-2 dark:text-neutral-200">
              Enhanced
              <br />
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Personalized AI mental health assessments. <br />
              Access to AI meditation and relaxation techniques. <br />
              Monthly progress tracking and reports. <br />
            </p>
            <div className="flex items-center justify-center">
              <button
                className="rounded-full pl-6 pr-3 py-3 text-white flex items-center justify-center space-x-1 bg-black mt-8 text-xs font-bold dark:bg-zinc-800"
                onClick={handleProceed}
              >
                <span>Buy now </span>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  $5
                </span>
              </button>
            </div>
          </BackgroundGradient>
        </Grid>

        <Grid
          item
          margin={10}
          spacing={10}
          gap={10}
          mr={10}
          ml={10}
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900">
            <Image
              src={`/moonpricethree.webp`}
              alt="moon-three"
              height="400"
              width="400"
              className="object-contain"
              style={{ filter: "brightness(200%) grayscale(100%)" }}
            />
            <p className="text-base sm:text-xl text-white mt-4 mb-2 dark:text-neutral-200">
              Premium <br />
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              24/7 access to AI-driven emotional support. <br />
              AI Mental health plans tailored to your needs. <br />
              Exclusive content from mindjourney. <br />
            </p>
            <div className="flex items-center justify-center">
              <button
                className="rounded-full pl-6 pr-3 py-3 text-white flex items-center justify-center space-x-1 bg-black mt-8 text-xs font-bold dark:bg-zinc-800"
                onClick={handleProceed}
              >
                <span>Buy now </span>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  $10
                </span>
              </button>
            </div>
          </BackgroundGradient>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          margin: "0 auto", // This centers the Box horizontally
          width: "50vw", // Adjust this for responsiveness; 50vw makes it 50% of the viewport width
          maxWidth: "800px", // Optional: Set a max-width for better readability on larger screens
          textAlign: "center",
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: jost.style.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.primary.contrastText,
            textAlign: "center",
            position: "flex",
          }}
        >
          Terms and Conditions for Mindjorney Memberships
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 8 }}>
          Effective Date: [8/26/2024]
        </Typography>
        {sections.map((section, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="subtitle1" sx={{ margin: 1 }}>
              {`${index + 1}. ${section.title}`}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {section.content}
            </Typography>
          </Box>
        ))}
      </Box>

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
