import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "@/styles/checkout.module.css";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { Invoice, AppBtn } from "@/components/Doc";
import Center from "@/components/templetes/Center";

export default function InvoicePage() {
  const { data: session } = useSession();
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", price: "" },
  ]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [issued, setIssued] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [payment, setPayment] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleItem, setToggleItem] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();
  // console.log(currency);

  const getUser = async () => {
    const res = await fetch(`/api/user/${session?.user?.email}`);
    const data = await res.json();
    setName(data.name);
    setImg(data.image);
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
    if (!session) {
      setIsSession(false);
    }

    getBusinessDetail();
    // console.log(`item${items} currency:${currency} name: ${name}`)
  };

  useEffect(() => {
    getUser();
  }, [session?.email]);

  // Adding new input field
  const addInput = () => {
    const newItems = [...items];
    newItems.push({
      id: newItems.length + 1,
      name: "",
      quantity: "",
      price: currency + "",
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
        onClick={() => {
          router.replace("/");
        }}
      />
      <div>
        <div
          className={styles.setBusinessPopUp}
          style={{ display: !isPopUp ? "none" : "block" }}
        >
          <div className={styles.setBusinessSubPopUp}>
            <input
              type="text"
              placeholder="Add Currency Symbol"
              value={currency}
              className={styles.name}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            />
            <div>
              <button
                onClick={() => {
                  setIsPopUp(false);
                }}
                className={styles.btnCtaAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* <div
          className={styles.setBusinessPopUp}
          style={{ display: !isSession ? "block" : "none" }}
        >
          <div className={styles.setBusinessSubPopUp}>
            <p></p>
            <div>
              <button
                onClick={() => {
                  setIsPopUp(false);
                }}
                className={styles.btnCta}
              >
                Add
              </button>
            </div>
          </div>
        </div> */}

        <div className={styles.formFlex}>
          <div className={styles.firstFlex} style={{display: isPreview?"none":"block"}}>
            <form>
              <div className={styles.business}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "2rem 0 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Icon
                      icon="material-symbols:drag-indicator"
                      width="1.5rem"
                      height="1.5rem"
                      style={{ color: "#888888" }}
                    />
                    <p>SLIP DETAILS</p>
                  </div>
                  {toggle ? (
                    <Icon
                      icon="mdi:chevron-down"
                      width="1.2rem"
                      height="1.2rem"
                      style={{
                        color: "#888888",
                        border: "1px solid #888888",
                        borderRadius: "50%",
                        padding: ".1rem",
                      }}
                      onClick={() => {
                        setToggle(false);
                        setToggleItem(true);
                      }}
                    />
                  ) : (
                    <Icon
                      icon="mingcute:up-line"
                      width="1.2rem"
                      height="1.2rem"
                      style={{
                        color: "#888888",
                        border: "1px solid #888888",
                        borderRadius: "50%",
                        padding: ".1rem",
                      }}
                      onClick={() => {
                        setToggle(true);
                        setToggleItem(false);
                      }}
                    />
                  )}
                </div>
                <div style={{ display: toggle ? "none" : "block" }}>
                  <div className={styles.logo}>
                    <div className={styles.inputContainer}>
                      <label>Business name</label>
                      <input
                        type="text"
                        placeholder="Business Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
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
                            width="4.5rem"
                            height="4.5rem"
                          />
                        )}
                      </label>
                      <input
                        type="file"
                        id="addImage"
                        name="addImage"
                        accept="image/*"
                        // value={img}
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

                              console.log(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <label>Business address</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter your business address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <label>Business number</label>
                    <br />
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="Enter your business number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <label>Issued to:</label>
                    <br />
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="Enter your customer name"
                      value={issued}
                      onChange={(e) => setIssued(e.target.value)}
                    />
                  </div>
                  <div className={styles.currency}>
                    <div>
                      <label>Payment type</label>
                      <br />
                      <select
                        // style={{padding: ".3rem 0"}}
                        id="paymentSelect"
                        onChange={(e) => {
                          setPayment(e.target.value);
                        }}
                      >
                        <option value="Bank Transfer">Bank transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Crypto">Crypto</option>
                      </select>
                    </div>
                    <div>
                      <label>Currency</label>
                      <br />
                      <select
                        id="currencySelect"
                        onChange={(e) => {
                          if (e.target.value === "") setIsPopUp(true);
                          setCurrency(e.target.value);
                        }}
                      >
                        <option defaultValue={"$"} value="$">
                          USD
                        </option>
                        <option value="€">EUR</option>
                        <option value="¥">JPY</option>
                        <option value="£">GBP</option>
                        <option value="A$">AUD</option>
                        <option value="C$">CAD</option>
                        <option value="Fr">CHF</option>
                        <option value="¥">CNY</option>
                        <option value="kr">SEK</option>
                        <option value="NZ$">NZD</option>
                        <option value="₹">INR</option>
                        <option value="R">ZAR</option>
                        <option value="E£">EGP</option>
                        <option value="₦">NGN</option>
                        <option value="KSh">KES</option>
                        <option value="د.ج">DZD</option>
                        <option value="DH">MAD</option>
                        <option value="GH₵">GHS</option>
                        <option value="DT">TND</option>
                        <option value="Kz">AOA</option>
                        <option value="USh">UGX</option>
                        <option value="₡">CRC</option>
                        <option value="₱">PHP</option>
                        <option value="₫">VND</option>
                        <option value="₪">ILS</option>
                        <option value="₺">TRY</option>
                        <option value="Rp">IDR</option>
                        <option value="RM">MYR</option>
                        <option value="₽">RUB</option>
                        <option value="Br">BRL</option>
                        <option value="CLP$">CLP</option>
                        <option value="COP$">COP</option>
                        <option value="S/">PEN</option>
                        <option value="KD">KWD</option>
                        <option value="Ft">HUF</option>
                        <option value="₴">UAH</option>
                        <option value="QAR">QAR</option>
                        <option value="NT$">TWD</option>
                        <option value="lei">RON</option>
                        <option value="ARS$">ARS</option>
                        <option value="JD">JOD</option>
                        <option value="BD">BHD</option>
                        <option value="﷼">SAR</option>
                        <option value="">OTHERS</option>
                        {/* <!-- Add more options for other currencies --> */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.itemSection}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "2rem 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Icon
                      icon="material-symbols:drag-indicator"
                      width="1.5rem"
                      height="1.5rem"
                      style={{ color: "#888888" }}
                    />
                    <p className={styles.p}>SLIP ITEMS</p>
                  </div>
                  {toggleItem ? (
                    <Icon
                      icon="mdi:chevron-down"
                      width="1.2rem"
                      height="1.2rem"
                      style={{
                        color: "#888888",
                        border: "1px solid #888888",
                        borderRadius: "50%",
                        padding: ".1rem",
                      }}
                      onClick={() => {
                        setToggleItem(false);
                        setToggle(true);
                      }}
                    />
                  ) : (
                    <Icon
                      icon="mingcute:up-line"
                      width="1.2rem"
                      height="1.2rem"
                      style={{
                        color: "#888888",
                        border: "1px solid #888888",
                        borderRadius: "50%",
                        padding: ".1rem",
                      }}
                      onClick={() => {
                        setToggleItem(true);
                        setToggle(false);
                      }}
                    />
                  )}
                </div>

                <div style={{ display: toggleItem ? "none" : "block" }}>
                  {items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        borderBottom: "1px dashed gray",
                        paddingBottom: "2rem",
                        paddingTop: "2rem",
                      }}
                    >
                      <div
                        className={styles.items}
                        style={{ paddingRight: "5px" }}
                      >
                        <div style={{ width: "100%" }}>
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <label>Product name</label>
                            <Icon
                              icon="ic:baseline-delete"
                              width="1.5rem"
                              height="1.5rem"
                              style={{ color: "red",}}
                              onClick={() => {
                                const newItems = items.filter(
                                  (eachItem) => eachItem.id != item.id
                                );
                                setItems(newItems);
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Enter the service you are offering"
                            value={item.name}
                            className={styles.name}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].name = e.target.value;
                              setItems(newItems);
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={styles.items}
                        style={{ gap: "30px", paddingTop: "1rem" }}
                      >
                        <div>
                          <label>Quantity</label>
                          <br></br>
                          <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            className={styles.quantity}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].quantity = e.target.value;
                              setItems(newItems);
                            }}
                          />
                        </div>
                        <div>
                          <label>Price</label>
                          <br></br>
                          <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            className={styles.price}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].price = e.target.value;
                              setItems(newItems);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div style={{ display: toggleItem ? "none" : "block" }}>
              <div className={styles.flex}>
                <button onClick={addInput} className={styles.btn}>
                  <Icon
                    icon="gridicons:add-outline"
                    width="1.2rem"
                    height="1.2rem"
                    style={{ color: "#C344FF" }}
                  />
                  <p>Add new item</p>
                </button>
                <button onClick={()=>{setIsPreview(true)}} className={styles.btnCta}>
                  Preview
                </button>
              </div>
            </div>
          </div>

          <div className={styles.receiptSection} style={{display: isPreview?"block":"none"}}>
            <Center />
            <AppBtn />
          </div>
        </div>
        {/*  */}
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
