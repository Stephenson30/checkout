import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  if (Component.getLayout) {
    return (
      <SessionProvider session={session}>
        {Component.getLayout(
          <>
            <Component {...pageProps} />
          </>
        )}
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <Header />
        <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
