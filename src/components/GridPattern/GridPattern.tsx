import { useEffect, useState } from 'react'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import styles from './GridPattern.module.scss'

type PropsType = {
    elements: any[]
} & React.HTMLAttributes<HTMLDivElement>

export const GridPattern: React.FC<PropsType> = ({ elements, ...props }) => {
    const { isDesktop, isTablet, isMobile, isSmallMobile } = useMatchMedia()
    //console.log(isDesktop, isTablet, isMobile, isSmallMobile);


    const blocks = []
    for (let i = 1; i <= elements.length; i++) {
        blocks.push(<div key={i} className={[styles[`item-${i}`], styles.item].join(' ')}>{elements?.[i - 1]}</div>)
    }

    const [rowsCount, setRowsCount] = useState(6)
    const [rowHeight, setRowHeight] = useState('140px')

    useEffect(() => {
        if (isSmallMobile) {
            setRowsCount(elements.length)
        } else {
            if (elements.length < 4) {
                setRowsCount(2)
            } else if (elements.length < 6) {
                setRowsCount(3)
            } else if (elements.length < 8) {
                setRowsCount(4)
            } else if (elements.length < 9) {
                setRowsCount(5)
            } else {
                setRowsCount(6)
            }
        }
    }, [isSmallMobile, elements])

    useEffect(() => {
        if (isDesktop) {
            setRowHeight('140px')
        } else if (isTablet) {
            setRowHeight('20vw')
        } else if (isMobile) {
            setRowHeight(`20vw`)
        } else if (isSmallMobile) {
            setRowHeight(`55vw`)
        }
    }, [isDesktop, isTablet, isMobile, isSmallMobile])


    return (
        <div className={styles.container} style={{ gridTemplateRows: `repeat(${rowsCount}, ${rowHeight})` }} {...props}>
            {blocks}
            {/* <div className={styles['item-1']}>1</div>
            <div className={styles['item-2']}>2</div>
            <div className={styles['item-3']}>3</div>
            <div className={styles['item-4']}>4</div>
            <div className={styles['item-5']}>5</div>
            <div className={styles['item-6']}>6</div>
            <div className={styles['item-7']}>7</div>
            <div className={styles['item-8']}>8</div>
            <div className={styles['item-9']}>9</div>
            <div className={styles['item-10']}>10</div>
            <div className={styles['item-11']}>11</div>
            <div className={styles['item-12']}>12</div> */}
        </div>
    )
}