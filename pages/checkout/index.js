import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "@/styles/checkout.module.css";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";


export default function InvoicePage() {
  const { data: session } = useSession();
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", price: "" },
  ]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();
  

  const getUser = async () => {
    const res = await fetch(`/api/user/${session?.user?.email}`);
    const data = await res.json();
    setName(data.name)
    setImg(data.image)
  };

  const getBusinessDetail = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: img,
          businessName: name,
        }),
      });
      if (res.ok) {
        // alert("Updated successfully");
        const message = await res.json();
        console.log(message.message);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmit = () => {
    getBusinessDetail();
  };

  useEffect(() => {
    getUser();
  }, [session]);

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

  return (
    <div className={styles.form}>
      <Icon
        icon="entypo:back"
        width="1.2rem"
        height="1.2rem"
        style={{ color: "black", margin: "-4rem 0 1rem 1rem" }}
        onClick={()=>{router.replace("/")}}
      />
      <div>
        <form>
          <div className={styles.business}>
            <p>Add Business Detail</p>
            <div>
              <div className={styles.dropzone}>
                <label htmlFor="addImage">
                  {img ? (
                    <Image
                      src={img}
                      alt="img"
                      className={styles.image}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Icon
                      icon="ph:image"
                      className={styles.icon}
                      width={"100"}
                    />
                  )}
                </label>
                <input
                  type="file"
                  id="addImage"
                  name="addImage"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    // console.log(`file: ${e.target.files[0]}`);
                    const file = e.target.files[0];
                    if (file) {
                      // Read the file as a Data URL
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        // Set the base64-encoded image data
                        setImg(reader.result);

                        // console.log(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
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
                    const newItems = items.filter(
                      (eachItem) => eachItem.id != item.id
                    );
                    setItems(newItems);
                  }}
                />
              </div>
            ))}
          </div>
        </form>
        <div className={styles.flex}>
          <button onClick={addInput}>
            <Icon
              icon="gridicons:add-outline"
              width="1rem"
              height="1rem"
              style={{ color: "black" }}
            />
            <p>Add another</p>
          </button>
          <button onClick={handleSubmit} className={styles.btnCta}>Create</button>
        </div>
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
