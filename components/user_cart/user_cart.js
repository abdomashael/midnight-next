import React, {useState, useRef, useContext} from "react";
import styles from "./user_cart.module.css";
import cx from "classnames"
import {ProfileContext, SELECTOR} from "../../pages/profile/profile";
const UserCart = ({userData}) => {
  const [onLoad, setOnLoad] = useState(false);

  const profile = useContext(ProfileContext)

  return (
    <span className={cx(styles.container)}>
      <div>
        <img className={cx(styles.avatar)} alt="avater" src={userData&&userData.profileImg?userData.profileImg:"/profile.png"}/>
        <h2 className={cx(styles.username)}>{userData?userData.name:"ddssssssssssssssssd"}</h2>
      </div>
      <div className={cx(styles.btn)} onClick={()=>{profile.setSelector(SELECTOR.profile)}}>Profile</div>
      <div className={cx(styles.btn)} onClick={()=>{profile.setSelector(SELECTOR.wishlist)}}>Wishlist</div>
      <div className={cx(styles.btn)} onClick={()=>{profile.setSelector(SELECTOR.lists)}}>Lists</div>
    </span>
  );
};

export default UserCart;
