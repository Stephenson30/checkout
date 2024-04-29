import styles from "@/components/templetes/styles/center.module.css";
import Image from "next/image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Center({
  items,
  name,
  img,
  address,
  number,
  currency,
  issued,
  payment,
  isPreviewLarge,
}) {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const componentRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${date} ${time}`);
    }, 1000); // Update every second

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [items]);

  const handleDownload = () => {
    if (!session && isPreviewLarge) {
      // If user is not signed in, display a popup suggesting sign-up
      Swal.fire({
        title: "Sign Up",
        text: "Sign up to save your business details for next time.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        cancelButtonText: "Ignore",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to sign-up page
          signIn("google");
        } else {
          // Ignore sign-up suggestion and continue
          handleDownloadImage();
        }
      });
    } else {
      // If user is signed in, directly download business details
      handleDownloadImage();
    }
  };

  const handleDownloadImage = () => {
    // if (componentRef.current) {
    //   html2canvas(componentRef.current).then((canvas) => {
    //     canvas.toBlob((blob) => {
    //       saveAs(blob, "invoice.png");
    //     });
    //   });
    // }

    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "invoice.png");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      });
    }
  };

  return (
    <div>
      <div className={styles.center} ref={componentRef}>
        <div className={styles.dot}></div>
        {/* <button onClick={()=>signOut()}>click</button> */}
        <div className={styles.header}>
          <Image
            src={img ? img : "/tilldeck.svg"}
            alt="logo"
            width={40}
            height={40}
            className={styles.logo}
          />
          <h3>{name}</h3>
          <p>{address}</p>
          <p>{number}</p>
        </div>
        <div className={styles.dot}></div>
        <div className={styles.client}>
          <div>
            <p className={styles.detail}>ISSUED TO:</p>
            <p className={styles.aboutDetail}>{issued}</p>
          </div>
          <div>
            <p className={styles.detail}>PAYMENT TYPE:</p>
            <p className={styles.aboutDetail}>{payment}</p>
          </div>
          <div>
            <p className={styles.detail}>DATE - TIME:</p>
            <p className={styles.aboutDetail}>{currentDateTime}</p>
          </div>
        </div>
        <div className={styles.dot}></div>
        <div className={styles.table}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "60%", textAlign: "left" }}>NAME</th>
                <th style={{ width: "15%", textAlign: "center" }}>QTY</th>
                <th style={{ width: "25%", textAlign: "right" }}>PRICE</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr>
                <td style={{ paddingTop: ".6rem" }}></td>
                <td style={{ textAlign: "center", paddingTop: ".6rem" }}></td>
                <td style={{ textAlign: "right", paddingTop: ".6rem" }}></td>
              </tr>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "right" }}>
                    {currency}
                    {item.price}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ paddingTop: "6.5rem" }}></td>
                <td style={{ textAlign: "center", paddingTop: "6.5rem" }}></td>
                <td style={{ textAlign: "right", paddingTop: "6.5rem" }}></td>
              </tr>
              <tr className={styles.tableRow}>
                <td style={{ color: "#5f5f5f" }}>TOTAL</td>
                <td style={{ textAlign: "center" }}>
                  {items.reduce(
                    (total, item) => total + Number(item.quantity),
                    0
                  )}
                </td>
                <td style={{ textAlign: "right" }}>
                  {currency}
                  {items.reduce((total, item) => total + Number(item.price), 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.dot}></div>
        <div className={styles.footer}>
          <Image src={"/Vector.svg"} alt="qrcode" width={32} height={32} />
          <p>Payment validates order, Thank you. Hope to see you again.</p>
        </div>
        <div className={styles.dot}></div>
      </div>
      <div>
        <button className={styles.btn} onClick={handleDownload}>
          <Icon
            icon="mdi:arrow-collapse-down"
            width="1.4rem"
            height="1.4rem"
            style={{ color: "#fff" }}
          />
          <p>Download slip</p>
        </button>
      </div>
    </div>
  );
}
