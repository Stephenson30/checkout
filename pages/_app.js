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
          <link rel="icon" href="/tilldeck.svg" />
          <link rel="manifest" href="/manifest.json" />
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
          content="Empower your small business with our intuitive invoice generator app. Effortlessly create professional receipts in just one click, streamlining your billing process and saving you valuable time. Simplify your financial management and boost productivity with ease.
          Generate Invoice Receipt In One Click"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tilldeck.svg" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </SessionProvider>
    </>
  );
}
