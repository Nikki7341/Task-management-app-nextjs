"use client";
import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import ThemeRegistry from "@/styles/ThemeRegistry";
import { Provider } from "react-redux";
import store from "@/store/store";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading indicator if you prefer
  }

  return (
    <Provider store={store}>
      <ThemeRegistry>
        <Component {...pageProps} />
      </ThemeRegistry>
    </Provider>
  );
}

export default MyApp;
