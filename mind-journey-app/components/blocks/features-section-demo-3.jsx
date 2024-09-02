"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Typography, Button } from "@mui/material";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { createTheme } from "@mui/material/styles";
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
        main: '#573F66',
        dark: '#3F1658',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#588DE2',
        main: '#3B68B0',
        dark: '#0B367C',
        contrastText: '#F6F4DC',
      },
    },
  });

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "AI-Powered Journaling",
      description:
        "Our AI-powered journaling feature helps you keep track of your mental health and well-being. With our advanced AI technology, you can get personalized insights and recommendations to improve your mental health.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "AI-Personalized Mental Health Plans, Guided Meditation, and Relaxation Techniques",
      description:
        "Our AI-powered health companion offers personalized mental health plans, guided meditation, and relaxation techniques to help you improve your mental well-being. Our platform leverages cutting-edge models to deliver a seamless experience. ",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Watch our AI Demos on YouTube",
      description:
        "Watch our AI demos on YouTube to learn more about our AI technology.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "AI-Powered Health Companion",
      description:
        "Experience lightning-fast, state-of-the-art AI assistance with our cloud services. Our free tier harnesses the power of GPT-3.5 Turbo, while our paid plans elevate your experience with the advanced 4o-mini and 4o models. Deploy your personalized AI companion in seconds and take control of your mental well-being.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    (<div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">
          Packed full of features
        </h4>

        <p
          className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Packed with advanced features, our AI Health Companion offers personalized support for your mental well-being. From insightful analysis to actionable recommendations, our platform leverages cutting-edge models to deliver a seamless experience. 
        </p>
      </div>
      <div className="relative ">
        <div
          className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>)
  );
}

const FeatureCard = ({
  children,
  className
}) => {
  return (
    (<div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>)
  );
};

const FeatureTitle = ({
  children
}) => {
  return (
    (<p
      className=" max-w-5xl mx-auto text-left tracking-tight text-white dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>)
  );
};

const FeatureDescription = ({
  children
}) => {
  return (
    (<p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}>
      {children}
    </p>)
  );
};

export const SkeletonOne = () => {
  return (
    (<div className="relative flex py-8 px-2 gap-10 h-full">
      <div
        className="w-full  p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          {/* TODO */}
          <Image
            src="/linear.webp"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm" />
        </div>
      </div>
      <div
        className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div
        className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>)
  );
};

export const SkeletonThree = () => {
  return (
    (<Link
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10  h-full group/image">
      <div
        className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto opacity-85" />
          <Image
            src="/images/youtube.png"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200" />
        </div>
      </div>
    </Link>)
  );
};

export const SkeletonTwo = () => {
  const images = [
    "/images/meditation1.png",
    "/images/meditation2.png",
    "/images/meditation3.png",
    "/images/desc2.png",
    "/images/chatbot1.png",
    "/images/chatbot1.png",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <Link href="/ai-plan" className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      {/* Existing content */}
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            key={"images-first" + idx}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="demo images"
              width="500"
              height="500"
              className="rounded-lg h-30 w-30 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </Link>
  );
};

export const SkeletonFour = () => {
  return (
    (
    <Link  className="absolute text-white h-40 md:h-40  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-0" href="/ai-companion-chat">
    <div
      className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
     
      <h1 className="text-2xl relative z-20 md:text-4xl lg:text-5xl font-bold text-center text-black dark:text-white font-sans tracking-tight mt-12">
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
          <Typography variant="h5" sx={{color:theme.palette.primary.main, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, marginBottom: 5}}>Your Personal AI Companion, powered by OpenAI GPT 3.5 Turbo | Free Users</Typography>
        </div>
      </h3>

      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="text-white flex items-center space-x-4"
      >
        <Link href="/ai-companion-chat">Try it out now!</Link>
      </HoverBorderGradient>    
    </div>
    </Link>
    )
  );
};