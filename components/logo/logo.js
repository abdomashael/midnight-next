
import styles from "./logo.module.css";
const Logo = (props)=>{
    return(
        <div className={props.logo? props.logo:styles.logo} >
            <span className={styles.mid}>Mid</span>
            <span className={styles.night}>Night</span>
        </div>
    )
}

export default Logo;
