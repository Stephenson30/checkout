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
        <title>CHECKOUT</title>
        <meta name="description" content="Generate Invoice Receipt In One Click" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <div className={styles.firstSection}>
            <div className={styles.firstSection1}>
              <Image
                src="/firstImage.gif"
                alt="dashboard"
                className={styles.firstImage}
                width={400}
                height={400}
                priority
              />
              <p className={styles.title}>
                Generate Invoice <br /> Receipt
              </p>
              <p>Easy To Use and 100% Free</p>
            </div>

            <div className={styles.firstSection2}>
              <div>
                <button onClick={()=>{router.replace("/checkout")}}>Generate Invoice</button>
                <p>Priortize Your Customer</p>
              </div>
            </div>
          </div>

          <div className={styles.secondSection}>
            <p className={styles.title}>Mission</p>
            <div className={styles.secondSection1}>
              <div>
                <p>
                  At CHECKOUT, our mission is to empower businesses of all sizes
                  by providing a robust, open-source solution for managing
                  invoicing and receipts. We believe that efficient invoicing is
                  the cornerstone of financial stability and professionalism for
                  any business, regardless of its scale or industry. By
                  leveraging the power of technology and the principles of
                  open-source collaboration, we aim to make invoicing easy,
                  accessible, and affordable for everyone.
                </p>
              </div>
              <Image
                src="/secondImage.png"
                alt="time"
                className={styles.secondImage}
                width={400}
                height={400}
                priority
              />
            </div>
          </div>

          <div className={styles.secondSection}>
            <p className={styles.title}>Support Our Mission</p>
            <div className={styles.secondSection1}>
              <div>
                <Image
                  src="/donate.png"
                  alt="time"
                  className={styles.secondImage}
                  width={400}
                  height={400}
                  priority
                />
                <div>
                  <button>Donate</button>
                  <h3 className={styles.btnp}>Your support is invaluable</h3>
                </div>
              </div>
              <div>
                <p>
                  At CHECKOUT, we are committed to empowering businesses
                  worldwide through our open-source invoicing platform. Our
                  mission is to make invoicing accessible, efficient, and
                  affordable for entrepreneurs, freelancers, and enterprises
                  alike. With your support, we can continue to innovate,
                  improve, and maintain our platform to benefit the entire
                  community.
                </p>
                <p>
                  Every donation, no matter the size, makes a difference. By
                  donating to CHECKOUT, you become a vital part of our community
                  and contribute to our shared vision of democratizing access to
                  invoicing solutions. Your support helps us create
                  opportunities for businesses to thrive, fosters innovation,
                  and drives positive change in the global business landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}