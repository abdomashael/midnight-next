import React, { useState, useRef } from "react";
import styles from "./poster.module.css";
import Loader from "../loader/loader";
import Link from "next/link";
const Poster = (props) => {
  const [onLoad, setOnLoad] = useState(false);
  const imgRef = useRef(null);
  

  return (
    <Link href={`/${props.type}/`+props.data.id} >
      <div onMouseEnter={()=>{imgRef.current.className=styles.hover}} onMouseLeave={()=>{imgRef.current.className=styles.img}} className={styles.container}>
        <div className={styles.img_container}>
          <img
          ref={imgRef}
            alt="sssss"
            hidden={!onLoad}
            onLoad={setOnLoad}
            className={styles.img}
            src={process.env.REACT_APP_IMAGE_BASE_URL_W300+ props.data.poster_path}
          />
          <div hidden={onLoad}>
            <Loader />
          </div>
          <div className={styles.top}>
            <span className={styles.badge + " " + styles.rate}>
              {props.data.vote_average}
            </span>

            <span
              hidden={!props.data.adult}
              className={styles.badge + " " + styles.adult}
              // hidden={props.liveHidden}
            >
              +18
            </span>
          </div>
        </div>
        <div className={styles.title}>
          {props.data.title ? props.data.title : props.data.original_title}
        </div>
      </div>
    </Link>
  );
};

export default Poster;
