// components/AddToHomeScreenPrompt.js

import { useEffect, useState } from 'react';
import styles from './AddToHomeScreenPrompt.module.css';
import Image from 'next/image';

const AddToHomeScreenPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) return;

    promptEvent.prompt();

    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setIsVisible(false);
  };

  return (
    <div className={`${styles.prompt} ${isVisible ? styles.show : ''}`}>
      <div className={styles.content}>
        <div className={styles.flex}>
            <Image src={'/tilldeck.svg'} alt='logo' width={40} height={40}/>
            <div>
            <p>Install for quick access.</p>
            <button onClick={handleInstallClick}>Install</button>
            </div>
        </div>
        <button className={styles.closeButton} onClick={handleCloseClick}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddToHomeScreenPrompt;
