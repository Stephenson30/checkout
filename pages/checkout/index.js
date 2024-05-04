import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "@/styles/checkout.module.css";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Center from "@/components/templetes/Center";
import Swal from "sweetalert2";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InvoicePage() {
  const { data: session } = useSession();
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", price: "" },
  ]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [currency, setCurrency] = useState("₦");
  const [issued, setIssued] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [payment, setPayment] = useState("Bank Transfer");
  const [toggled, setToggled] = useState(false);
  const [toggleItem, setToggleItem] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isPreviewLarge, setIsPreviewLarge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // console.log(currency);

  const getUser = async () => {
    const res = await fetch(`/api/user/${session?.user?.email}`);
    const data = await res.json();
    // console.log(data)
    setName(data?.name?data?.name: name);
    setImg(data?.image? data?.image: img);
    setAddress(data?.address?data?.address: address);
    setNumber(data?.number?data?.number: number);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getBusinessDetail = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img,
          name,
          address,
          number,
        }),
      });
      if (res.ok) {
        const message = await res.json();
        console.log(message.message);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  // handling the preview
  const handlePreview = () => {
    if (!session?.user?.email) {
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
          // Ignore sign-up suggestion and continuesetIsLoading(true);
          setIsLoading(true);
          console.log("loading...");
          
          // Simulate asynchronous operation
          setTimeout(() => {
            if (
              !items ||
              !name ||
              !img ||
              !address ||
              !number ||
              !currency ||
              !issued ||
              !payment
            ) {
              toast.error("Please complete all input details.");
              setIsLoading(false);
              return;
            }
            setIsPreview((pre) => !pre);
            if (!isPreview) {
              setIsLoading(false);
            }
            toast.success("You have sucessfully generated an invoice");
            // Perform other actions after loading
          }, 3000); // 3 seconds delay
        }
      });
    } else {
      getBusinessDetail();

      setIsLoading(true);
      console.log("loading...");
      // Simulate asynchronous operation
      setTimeout(() => {
        setIsLoading(false);
        if (
          !items ||
          !name ||
          !img ||
          !address ||
          !number ||
          !currency ||
          !issued ||
          !payment
        ) {
          toast.error("Please complete all input details.");
          return;
        }
        setIsPreview((pre) => !pre);
        if (!isPreview) {
          toast.success("You have sucessfully generated an invoice");
        }
        // Perform other actions after loading
      }, 3000); // 3 seconds delay
    }
  };

  useEffect(() => {
    // Function to update isPreview based on window width
    const updatePreview = () => {
      if (window.innerWidth < 750) {
        setIsPreview(false);
        setIsPreviewLarge(false);
      } else {
        setIsPreview(true);
        setIsPreviewLarge(true);
      }
    };

    // Initial check on component mount
    updatePreview();

    // Event listener for window resize
    window.addEventListener("resize", updatePreview);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updatePreview);
    };
  }, []); // Empty dependency array to run effect only once on mount

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

  const openPopup = () => {
    Swal.fire({
      title: "Add Currency Symbol",
      html: `
        <input id="currencyInput" class="swal2-input" placeholder="Add Currency Symbol">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const currency = document.getElementById("currencyInput").value;
        setCurrency(currency);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsPopUp(false);
      }
    });
  };

  return (
    <div className={styles.form}>
      {isPreview && !isPreviewLarge ? (
        <Icon
          icon="entypo:back"
          width="1.2rem"
          height="1.2rem"
          style={{ color: "black", margin: "-4rem 0 1rem 1rem" }}
          onClick={() => {
            // handlePreview();
            setIsPreview(false);
          }}
        />
      ) : (
        <Icon
          icon="entypo:back"
          width="1.2rem"
          height="1.2rem"
          style={{ color: "black", margin: "-4rem 0 1rem 1rem" }}
          onClick={() => {
            router.replace("/");
          }}
        />
      )}
      <div>
        <div>
          <div
            className={styles.setBusinessPopUp}
            style={{ display: !isPopUp ? "none" : "block" }}
          >
            <div className={styles.setBusinessSubPopUp}>
              <button onClick={openPopup} className={styles.btnCtaAdd}>
                Add Currency
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className={styles.setBusinessAlert}>
            <div className={styles.setBusinessSubAlert}>
              <MutatingDots
                height="100"
                width="100"
                secondaryColor="#C344FF"
                radius="14"
                color="#9C00E5"
                ariaLabel="loading"
              />
            </div>
          </div>
        )}

        <ToastContainer />

        <div className={styles.formFlex}>
          <div
            className={styles.firstFlex}
            style={{
              display:
                isPreview && isPreviewLarge
                  ? "block"
                  : !isPreview && !isPreviewLarge
                  ? "block"
                  : !isPreview
                  ? "block"
                  : "none",
            }}
          >
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
                  {toggled ? (
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
                        setToggled(false);
                        setToggleItem(true);
                      }}
                    />
                  ) : (
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
                        setToggled(true);
                        setToggleItem(false);
                      }}
                    />
                  )}
                </div>
                <div style={{ display: toggled ? "none" : "block" }}>
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
                          <p style={{textAlign:"center", fontSize:"16px", color:"#c344ff"}}>Add Logo</p>
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
                        <option
                          defaultValue={"Bank Transfer"}
                          value="Bank Transfer"
                        >
                          Bank transfer
                        </option>
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
                        <option defaultValue={"₦"} value="₦">
                          NGN
                        </option>
                        <option value="$">USD</option>
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
                        setToggleItem(false);
                        setToggled(true);
                      }}
                    />
                  ) : (
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
                        setToggleItem(true);
                        setToggled(false);
                      }}
                    />
                  )}
                </div>

                <div style={{ display: toggleItem ? "none" : "block" }}>
                  {items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        borderBottom: "1.1px solid #EBEBEB",
                        paddingBottom: "2rem",
                        paddingTop: "2rem",
                      }}
                    >
                      <div
                        className={styles.items}
                        style={{ paddingRight: "5px" }}
                      >
                        <div style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label>Product name</label>
                            <Icon
                              icon="ic:baseline-delete"
                              width="1.5rem"
                              height="1.5rem"
                              style={{ color: "red" }}
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
                <button onClick={handlePreview} className={styles.btnCta}>
                  Preview slip
                </button>
              </div>
            </div>
          </div>

          <div
            className={styles.receiptSection}
            style={{ display: isPreview ? "block" : "none" }}
          >
            <Center
              items={items}
              name={name}
              img={img}
              address={address}
              number={number}
              currency={currency}
              issued={issued}
              payment={payment}
              isPreviewLarge={isPreviewLarge}
            />
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
