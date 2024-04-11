import styles from "@/components/styles.module.css"
import { Icon } from '@iconify-icon/react';

export default function Footer() {
    return(
        <div className={styles.footer}>
            <div>
            <Icon icon="logos:google-gmail" width="2rem" height="2rem" color="white"/>
            <Icon icon="devicon:twitter" width="2rem" height="2rem" />
            </div>
            <hr/>
            <p>@ Checkout, All right reserved.</p>
        </div>
    )
}