import styles from './SmallPreloader.module.scss'

type PropsType = {
    className?: string
}

export const SmallPreloader: React.FC<PropsType> = ({ className }) => {
    return (
        <div className={[styles.ldsRing, className].join(' ')}><div></div><div></div><div></div><div></div></div>
    )
}