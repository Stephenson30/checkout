import { useEffect, useState } from 'react';
import styles from './AddToHomeScreenPrompt.module.css';
import Image from 'next/image';

const AddToHomeScreenPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default browser prompt
      event.preventDefault();
      // Store the event for later use
      setDeferredPrompt(event);
      // Show your custom prompt
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Trigger the installation prompt
      deferredPrompt.prompt();
      // Wait for the user's choice
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Reset the deferredPrompt
      setDeferredPrompt(null);
      // Hide the custom prompt
      setIsVisible(false);
    }
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
