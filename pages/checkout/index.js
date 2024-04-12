import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "@/styles/checkout.module.css";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import Header from "@/components/Header";

export default function InvoicePage() {
  const { data: session } = useSession();
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", price: "" },
  ]);
  const [name, setName] = useState("");

  // Adding new input field
  const addInput = () => {
    const newItems = [...items];
    newItems.push({
      id: newItems.length + 1,
      name: "",
      quantity: "",
      price: "",
    });
    setItems(newItems);
  };

  const deleteInput = (id) => {
    
  };

  const handleSubmit = () => {};

  return (
    <div className={styles.form}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.business}>
            <p>Add Business Detail</p>
            <div>
              <Image
                src={"/logo.png"}
                alt=""
                className={styles.image}
                width={100}
                height={100}
              />
              <input
                type="text"
                placeholder="Business Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.itemSection}>
            <p className={styles.p}>Add Item Detail</p>
            <div className={styles.flex}>
              <p>Name</p>
              <div className={styles.flexprice}>
                <p>Quantity</p>
                <p>Price</p>
              </div>
            </div>
            {items.map((item, index) => (
              <div key={index} className={styles.items}>
                <input
                  type="text"
                  placeholder="item name"
                  value={item.name}
                  className={styles.name}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].name = e.target.value;
                    setItems(newItems);
                  }}
                />
                <input
                  type="number"
                  placeholder="quantity"
                  value={item.quantity}
                  className={styles.quantity}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].quantity = e.target.value;
                    setItems(newItems);
                  }}
                />
                <input
                  type="number"
                  placeholder="price"
                  value={item.price}
                  className={styles.price}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].price = e.target.value;
                    setItems(newItems);
                  }}
                />
                <Icon
                  icon="ic:baseline-delete"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "red" }}
                  onClick={() => {
                    const newItems = items.filter((eachItem) => eachItem.id != item.id);
                    setItems(newItems);
                  }}
                />
              </div>
            ))}
          </div>
        </form>
        <button onClick={addInput}>
          <Icon
            icon="gridicons:add-outline"
            width="1rem"
            height="1rem"
            style={{ color: "black" }}
          />
          <p>Add another</p>
        </button>
      </div>
    </div>
  );
}

InvoicePage.getLayout = function PageLayout(page) {
  return (
    <>
      <Header />
      {page}
    </>
  );
};
