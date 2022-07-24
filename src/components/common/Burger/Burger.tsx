import cn from 'classnames'
import { useState } from 'react'
import styles from './Burger.module.scss'


type PropsType = {
    activeBurger: boolean
    setActiveBurger: (b: boolean) => void
}

export const Burger: React.FC<PropsType> = ({ activeBurger, setActiveBurger }) => {

    return (
        <div onClick={(e) => setActiveBurger(!activeBurger)}
            className={cn(styles.burger, { [styles.active]: activeBurger })}>
            <span></span>
        </div>
    )
}