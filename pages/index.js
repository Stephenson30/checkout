import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

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
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.firstSection}>
          <div className={styles.firstSection_1}>
            <Image
              src="/video.svg"
              alt="dashboard"
              className={styles.firstImage}
              width={14}
              height={14}
              priority
            />
            <p>See how it works</p>
          </div>
          <h1> Ditch the Paperwork, Get Paid Faster with Tilldesk</h1>
          <p>
            Generate professional invoices & receipts in seconds. Simplify your
            small business finances.
          </p>
          <button onClick={() => router.replace("/checkout")}>
            Get started for free
          </button>
        </div>

        <div className={styles.secondSection}>
          <Image
            src="/Frame.svg"
            alt="time"
            className={styles.secondImage}
            width={100}
            height={100}
            priority
          />
          <p className={styles.sub}>Supercharge Tilldeck</p>
          <p>
            Your donation fuels our mission to develop even more innovative
            features, helping more small businesses experience the ease of
            Tilldeck&lsquo;s combined invoices & receipts.
          </p>
          <div>
            <button>Donate via stripe</button>
            <button className={styles.transfer}>Donate via transfer</button>
          </div>
        </div>
      </main>
    </>
  );
}
