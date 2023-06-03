import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/providers/AuthProviders";
import Head from "next/head"
export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <>

<Head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </Head>



    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
</>
  );
}
