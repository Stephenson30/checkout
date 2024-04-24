import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  if (Component.getLayout) {
    return (
      <>
        <Head>
          <title>Tilldeck</title>
          <meta
            name="description"
            content="Generate Invoice Receipt In One Click"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/tilldeck.png" />
        </Head>
        <SessionProvider session={session}>
          {Component.getLayout(
            <>
              <Component {...pageProps} />
            </>
          )}
        </SessionProvider>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Tilldeck</title>
        <meta
          name="description"
          content="Generate Invoice Receipt In One Click"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tilldeck.png" />
      </Head>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </SessionProvider>
    </>
  );
}
