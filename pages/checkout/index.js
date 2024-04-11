

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";


export default function InvoicePage() {
  const { data: session } = useSession();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  
const getLocation = () => {
  const successCallback = (positions) => {
    console.log(positions);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

  useEffect(() => {
    getLocation()
  }, []);  
//  console.log(location)

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}