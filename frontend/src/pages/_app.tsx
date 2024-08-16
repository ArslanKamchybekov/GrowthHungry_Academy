// src/pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import ReduxProvider from "../components/ReduxProvider";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Navbar />
      <Sidebar />
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default MyApp;
