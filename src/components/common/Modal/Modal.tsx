import cn from 'classnames'
import { useEffect } from 'react'
import { MyButton } from '../MyButton/MyButton'
import styles from './Modal.module.scss'


type PropsType = {
    isActive: boolean
    setActive: (b: boolean) => void
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Modal: React.FC<PropsType> = ({ children, isActive, setActive }) => {


    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '1em'
        }

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0'
        }
    }, [isActive])

    return (
        <div
            onClick={() => setActive(false)}
            className={cn(styles.modal, { [styles.active]: isActive })}>
            <div className={styles.container}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cn(styles.content, { [styles.active]: isActive })}>
                    {children}
                </div>
            </div>
        </div>
    )
}