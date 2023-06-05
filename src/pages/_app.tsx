import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { UseUser, UserProvider } from "@/providers/AuthProviders";
import Head from "next/head";
import Header from "@/components/molecules/Header";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { user } = UseUser();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <UserProvider>
        <main className="w-full max-w-screen-2xl mx-auto">
          <Header />
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </>
  );
}
