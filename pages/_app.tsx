import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const  inter = Inter({subsets: ["latin"]});

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return(
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="383626936065-l83kbknnjjpkgfp5c5o3hvuk2gt2nskt.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster/>
        <ReactQueryDevtools/>
        </GoogleOAuthProvider>
       </QueryClientProvider>
    </div>
  );
}
