
import Link from 'next/link'
import Navbar from '../navbar/navbar'
import styles from './layout.module.css'
export default function Layout({ children }) {
    return (
        <div className={styles.conatiner}>

            <Navbar/>
            <main  >{children}</main>

        </div>
    )
}
