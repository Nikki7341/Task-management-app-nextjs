"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import "@fontsource/montserrat"; // Import Montserrat font

const montserrat = "'Montserrat', sans-serif";

export const pallete = {
  black: "#000",
  primaryBlack: "#36205F",
  primaryPink: "#DC0155",
  parimayBlue: "#573A9B",
  primaryWhite: "#FFFFFF",
  primaryPurple: "#573A9B",
  primaryGreen: "#00A478",
  selections: {
    green: "#75C57F",
    brown: "#EA973D",
    white: "#F6CF7D",
    pink: "#FA66FF",
    red: "#FF3F79",
    yellow: "#F7931A",
    blue: "#2F80ED",
  },
};

const font = "Inter";

const themeOptions: ThemeOptions = {
  palette: {
    primary: { main: pallete.primaryBlack },
    secondary: { main: pallete.primaryPurple },
    error: { main: pallete.selections.red },
    warning: { main: "#F5EE9E" },
    info: { main: "#645FF2" },
    success: { main: "#FFFFFF" },
    background: { default: "#fff" },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  typography: {
    fontFamily: montserrat,
    h5: {
      fontFamily: montserrat,
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,
      // lineHeight: 1.5,
    },
    h6: {
      fontFamily: montserrat,
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "22.4px",
    },
    h4: {
      fontFamily: montserrat,
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: 700,
      // lineHeight:"33.6px"
    },
    h3: {
      fontFamily: montserrat,
      fontSize: "32px",
      fontStyle: "normal",
      fontWeight: 400,
    },
    h2: {
      fontSize: "40px",
      fontWeight: "600",
    },
    subtitle1: {
      fontSize: "12px",
      fontWeight: 400,
      fontStyle: "normal",
      fontFamily: "Montserrat",
      lineHeight: "normal",
    },
    subtitle2: { fontSize: 12, letterSpacing: "0.03rem", fontWeight: "400" },
    body1: {
      color: "#030303",
      fontFamily: "Montserrat",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h1: {
      fontSize: "60px",
      fontWeight: 700,
    },
    body2: { fontSize: 16, letterSpacing: "0.03rem" },
  },
};

const theme = responsiveFontSizes(createTheme(themeOptions));

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

export const styles: any = {
  flexDisplay: {
    display: "flex",
    flexDirection: "row",
  },
  centerDivEnd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
  },
  opacityConatinner: {
    position: "relative",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex", 
    alignItems: "center", 
  },
  flexRowSpacedBw: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexColSpacedBw: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  primaryBtn: {
    borderRadius: "0px",
    padding: "5px 40px",
    fontSize: "20px",
    margin: "10px 40px 0 0",
  },
};
