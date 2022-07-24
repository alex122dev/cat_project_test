import styles from './MainBlock.module.scss'
import logoImg from '../../assets/image/main/Logo.png'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { useMediaQuery } from 'react-responsive'



export const MainBlock = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 499.98px)' })

    return (
        <div className={styles.mainBlock}>
            <div className={styles.body}>
                <Link to='/home' className={styles.logo}>
                    <img src={logoImg} alt="logo" />
                </Link>
                <h2 className={styles.title}>Hi intern!</h2>
                <p className={styles.text}>Welcome to MI 2022 Front-end test</p>
                <p className={styles.boldText}>Lets start using The Cat API</p>

                <Navbar minMenu={isMobile} />
            </div>
        </div>
    )
}