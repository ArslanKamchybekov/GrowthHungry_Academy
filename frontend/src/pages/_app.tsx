// src/pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import ReduxProvider from "../components/ReduxProvider";
import { useRefreshToken } from "../hooks/useRefreshToken";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useRefreshToken();
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default MyApp;
