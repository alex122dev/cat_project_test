import cn from 'classnames'
import styles from './Preloader.module.scss'

type PropsType = {
    className?: string
}

export const Preloader: React.FC<PropsType> = ({ className }) => {
    return (
        <div className={[styles.preloader, className].join(' ')} />
    )
}