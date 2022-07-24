import styles from './Home.module.scss'
import mainBanner from '../../assets/image/main/girl-and-pet 1.png'

export const Home = () => {
    return (
        <div className={styles.home}>
            <img src={mainBanner} alt="" />
        </div>
    )
}