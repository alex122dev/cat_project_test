import cn from 'classnames'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import styles from './CustomSelect.module.scss'


type OptionType = {
    value: any
    label: string | number
}

type PropsType = {
    selected: string
    setSelected: (value: string) => void
    //options: string[],
    startPlaceholder?: string,
    firstChecked?: boolean
    options: OptionType[]
}

export const CustomSelect: React.FC<PropsType> = ({ selected, setSelected, options,
    startPlaceholder = 'Make your choice', firstChecked = false }) => {
    const [isActive, setIsActive] = useState(false)
    const selectRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (!isActive) return
        console.log('effect');

        const handleClick = (e: Event) => {
            if (!selectRef.current) return
            if (!selectRef.current.contains(e.target as HTMLElement)) {
                setIsActive(false)
            }
        }

        document.addEventListener('click', handleClick)

        return () => {
            console.log('cleaning');
            document.removeEventListener('click', handleClick)
        }
    }, [isActive])

    return (
        <div ref={selectRef} className={cn(styles.body, { [styles.active]: isActive })}>
            <button
                onClick={e => setIsActive(!isActive)}
                className={styles.btn}>
                <span className={styles.chosen}>{selected
                    ? options.find(option => option.value === selected)?.label
                    : startPlaceholder}</span>
                <div className={['_icon-arrow-back', styles.arrow].join(' ')} />
            </button>
            <ul className={styles.content}>
                {options.map(option =>
                    <li key={option.label}
                        onClick={e => {
                            setSelected(option.value)
                            setIsActive(false)
                        }}
                        className={styles.option}>{option.label}</li>)}
            </ul>
        </div>
    )
}