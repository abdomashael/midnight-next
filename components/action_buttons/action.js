import  { useState, useEffect } from "react";
import styles from "./action.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Link from "next/link";

const ActionComponent = (props) => {
  const [component, setComponent] = useState(null);
  const [ id,setId]=useState(0)
  useEffect(() => {
    if (props.type === 2) {
      setComponent(addtofavButton);
    }else{
      setComponent([moreButton,addtofavButton]);
    }

    setId(props.movie?props.movie.id:0)
  }, [props.movie]);
 

  const addToFavHandler = () => {
    console.log("addtofav");
  };

  const moreButton = (
    <Link key={props.movie?props.movie.id:id}  href={props.movie&&props.movie.media_type==="tv"?`/series/${props.movie?props.movie.id:id}`:`/movie/${props.movie?props.movie.id:id}`}>
      <span className={styles.fullBtn}>
        <span
          className={`${styles.btnInner} ${props.wide ? styles.wide : null} `}
        >
          <FontAwesomeIcon icon={faPlay} className={"ml-2 " + styles.icon} />
          <label>More</label>
        </span>
      </span>
    </Link>
  );

  const addtofavButton = (
    <span key={1} className={styles.fullBtn} onClick={addToFavHandler}>
      <span
        className={`${styles.btnInnerBlack} ${
          props.wide ? styles.wide : null
        } `}
      >
        <FontAwesomeIcon icon={faPlus} className={"ml-2 " + styles.icon} />
        <label className={styles.label}>Add to list</label>
      </span>
    </span>
  );
  return <div className={styles.subContainer + " mt-2"}>{component}</div>;
};



export default (ActionComponent);
