import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/components/styles.module.css";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
const router = useRouter()
  //   console.log(session?.user?.image)

  return (
    <div className={styles.Header}>
      <div className={styles.logoName} onClick={()=> router.replace('/')}>
        <Image
          src={"/tilldeck.svg"}
          alt="logo"
          width={23}
          height={23}
          className={styles.logo}
        />
        <Image
          src={"/TilldeckTest.svg"}
          alt="logo"
          width={87.37}
          height={18.2}
          className={styles.name}
        />
      </div>
      {session ? (
        <div className={styles.flex}>
          <p>Signed in as {session?.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div className={styles.flex}>
          <p>Not signed in</p>
          <button
            onClick={() => signIn("google")}
            style={{ background: "none", border:"none", cursor:"pointer" }}
          >
            Login
          </button>
          <button onClick={() => signIn("google")}>Sign up</button>
        </div>
      )}
    </div>
  );
}
