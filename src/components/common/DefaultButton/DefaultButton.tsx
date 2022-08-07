import cn from "classnames"
import styles from './DefaultButton.module.scss'

type PropsType = {
    startColor: 'pink' | 'lightpink'
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const DefaultButton: React.FC<PropsType> = ({ children, className, startColor, ...props }) => {
    return (
        <button {...props}
            className={cn(styles.btn, {
                [className as string]: className,
                [styles[startColor]]: true
            })}>
            {children}
        </button>
    )
}