import styles from "@/components/templetes/styles/center.module.css";
import Image from "next/image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";

export default function Center({items, name, img, address, number, currency, issued, payment}) {
    console.log(items, name, img, address, number, currency, issued, payment)
  const componentRef = useRef(null);
  const handleDownloadImage = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, "invoice.png");
        });
      });
    }
  };

  return (
    <div>
      <div className={styles.center} ref={componentRef}>
        <div className={styles.dot}></div>
        <div className={styles.header}>
          <Image
            src={img? img:"/tilldeck.svg"}
            alt="logo"
            width={23}
            height={23}
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
                  <td style={{ textAlign: "right" }}>{currency}{item.price}</td>
                </tr>
              ))}
              <tr>
                <td style={{ paddingTop: "3rem" }}></td>
                <td style={{ textAlign: "center", paddingTop: "3rem" }}></td>
                <td style={{ textAlign: "right", paddingTop: "3rem" }}></td>
              </tr>
              <tr className={styles.tableRow}>
                <td style={{ color: "#5f5f5f" }}>TOTAL</td>
                <td style={{ textAlign: "center" }}>
                  {items.reduce((total, item) => total + item.quantity, 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                {currency}{items.reduce((total, item) => total + item.price, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.dot}></div>
        <div className={styles.footer}>
          <Image src={"/vector.svg"} alt="qrcode" width={30} height={30} />
          <p>Payment validates order, Thank you. Hope to see you again.</p>
        </div>
        <div className={styles.dot}></div>
      </div>
      <div>
        <button className={styles.btn} onClick={handleDownloadImage}>Download Image</button>
      </div>
    </div>
  );
}
