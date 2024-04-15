import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/components/styles.module.css"


export default function Header() {
  const { data: session } = useSession();

//   console.log(session?.user?.image)

  return (
    <div className={styles.Header}>
      <p className={styles.logo}>TILLDESK</p>
      {session ? (
        <div className={styles.flex}>
          <p>Signed in as {session?.user?.email}</p>
          {/* <img src={session?.user?.image} alt={`image of ${session?.user?.name}`} /> */}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div className={styles.flex}>
          <p>Not signed in</p>
          <button onClick={() => signIn("google")} style={{background:"none", fontWeight: "bold"}}>Log in</button>
          <button onClick={() => signIn("google")}>Sign up</button>
        </div>
      )}
    </div>
  );
}