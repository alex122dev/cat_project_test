import votingImg from '../../assets/image/main/vote-table.png'
import breedsImg from '../../assets/image/main/pet-breeds.png'
import galleryImg from '../../assets/image/main/images-search.png'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

type PropsType = {
    className?: string
    minMenu?: boolean
}

export const Navbar: React.FC<PropsType> = ({ className, minMenu = false }) => {

    return (
        <nav className={cn(className, { [styles.minMenu]: minMenu })}>
            <ul className={styles.list}>
                <li className={cn(styles.item, styles.item_voting)}>
                    <NavLink to='/voting' tabIndex={-1} className={({ isActive }) => cn(styles.link, { [styles.link_active]: isActive })}>
                        <div className={cn(styles.image, styles.image_voting)}>
                            <img src={votingImg} alt="voting" />
                        </div>
                        <button className={styles.btn}>VOTING</button>
                    </NavLink>
                </li>
                <li className={cn(styles.item, styles.item_breeds)}>
                    <NavLink to='/breeds' tabIndex={-1} className={({ isActive }) => cn(styles.link, { [styles.link_active]: isActive })}>
                        <div className={cn(styles.image, styles.image_breeds)}>
                            <img src={breedsImg} alt="breeds" />
                        </div>
                        <button className={styles.btn}>Breeds</button>
                    </NavLink>
                </li>
                <li className={cn(styles.item, styles.item_gallery)}>
                    <NavLink to='/gallery' tabIndex={-1} className={({ isActive }) => cn(styles.link, { [styles.link_active]: isActive })}>
                        <div className={cn(styles.image, styles.image_gallery)}>
                            <img src={galleryImg} alt="gallery" />
                        </div>
                        <button className={styles.btn}>gallery</button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
} 