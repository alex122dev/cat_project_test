import cn from 'classnames'
import React from 'react'
import { IconFontType } from '../../../types/IconFont'
import styles from './MyButton.module.scss'

type PropsType = {
    icon?: IconFontType
    //className: string
    startColor?: 'white' | 'pink'
    size: 'small' | 'big'
} & React.ButtonHTMLAttributes<HTMLButtonElement>


export const MyButton: React.FC<PropsType> = ({ icon, className, startColor = 'white', size, children, ...props }) => {
    return (
        <button {...props}
            className={cn(styles.btn, {
                [icon as any]: icon,
                [className as any]: className,
                [styles.pink]: startColor === 'pink',
                [styles.white]: startColor === 'white',
                [styles.small]: size === 'small',
                [styles.big]: size === 'big',
            })}>
            {children}
        </button>
    )
}