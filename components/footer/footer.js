import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.itemsConatiner}>
        <span className={styles.item}>
          <Link href="/">Home</Link>
        </span>
        <span className={styles.break}/>
        <span className={styles.item}>
          <Link href="/">About us</Link>
        </span>
        <span className={styles.break}/>
        <span className={styles.item}>
          <Link href="/">Terms & Condtuions</Link>
        </span>
        <span className={styles.break}/>
        <span className={styles.item}>
          <Link href="/">Privacy</Link>
        </span>
      </div>
      <div className={styles.credit}>© All rights reserved to Night Watcher</div>
    </div>
  );
};

export default Footer;
