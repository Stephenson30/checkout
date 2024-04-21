import styles from "@/components/templetes/styles/center.module.css";
import Image from "next/image";

export default function Center() {
  const items = [
    {
      name: "8 inches 2 layer buttercream cake",
      quantity: 1,
      price: 40,
    },
    {
      name: "Foodtray",
      quantity: 1,
      price: 30,
    },
    {
      name: "Platter of small chops",
      quantity: 5,
      price: 50,
    },
  ];

  return (
    <div className={styles.center}>
      <div className={styles.dot}></div>
      <div className={styles.header}>
        <Image
          src={"/tilldeck.png"}
          alt="logo"
          width={23}
          height={23}
          className={styles.logo}
        />
        <h3>Splendidbitz</h3>
        <p>Nnewi, Anambra state</p>
        <p>08139626882</p>
      </div>
      <div className={styles.dot}></div>
      <div className={styles.client}>
        <div>
          <p className={styles.detail}>ISSUED TO:</p>
          <p className={styles.aboutDetail}>Harrison</p>
        </div>
        <div>
          <p className={styles.detail}>PAYMENT TYPE:</p>
          <p className={styles.aboutDetail}>Bank transfer</p>
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
          <div style={{ paddingTop: ".6rem" }}></div>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>${item.price}</td>
              </tr>
            ))}
            <div style={{ paddingTop: "3rem" }}></div>
            <tr>
              <td style={{color:"#5f5f5f"}}>TOTAL</td>
              <td style={{ textAlign: "center" }}>
                {items.reduce((total, item) => total + item.quantity, 0)}
              </td>
              <td style={{ textAlign: "right" }}>
                ${items.reduce((total, item) => total + item.price, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.dot}></div>
      <div className={styles.footer}>
        <Image src={"/vector.svg"} alt="qrcode" width={30} height={30}/>
        <p>Payment validates order, Thank you. Hope to see you again.</p>
      </div>
      <div className={styles.dot}></div>
    </div>
  );
}
