import React from "react";
import styles from "./loader.module.css"
const Loader = () => {
  return (
    <div className={styles.loader_conatiner}>
      <span className={styles.loader1}>
        <span className={styles.loader2}/>
      </span>
    </div>
  );
};

export default Loader
