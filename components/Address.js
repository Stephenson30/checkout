import Image from "next/image";
import { useState } from "react";
import styles from "@/components/Address.module.css"

const EthereumAddress = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(address)
        .then(() => setCopied(true))
        .catch((error) => console.error("Failed to copy:", error));
    } else {
      // Fallback for browsers that do not support Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }

    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className={styles.div}>
      <Image src={"/code.png"} alt="qrcode transfer" width={200} height={200} style={{
        margin: "0 auto", display:"block"
      }}/>
      <div>
        <span>0xDBe9234dd590384dF...</span>
        <p>0xDBe9234dd590384dFA5eac91FEAe8C73f4c1a29a</p>
        <button onClick={copyToClipboard} style={{padding:".5em", background:"#9c00e5", color:"#fff",border:"none",borderRadius:"8px", cursor:"pointer"}}>{copied ? "Copied!" : "Copy"}</button>
      </div>
    </div>
  );
};

export default EthereumAddress;
