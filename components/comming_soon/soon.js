import { useEffect, useState } from "react";
import styles from "./soon.module.css";
import Logo from "../logo/logo";

const Soon = () => {
  return (
    <div className={styles.div}>
      {/* <span className={styles.logo}> */}
        <Logo logo={styles.logo}/>
      {/* </span> */}
      <span style={{'margin-top': '5vw'}}>Coming Soon .... </span>
    </div>
  );
};

export default Soon;
