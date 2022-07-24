import styles from './GridPattern.module.scss'

type PropsType = {
    elements: any[]
} & React.HTMLAttributes<HTMLDivElement>

export const GridPattern: React.FC<PropsType> = ({ elements, ...props }) => {


    const blocks = []
    for (let i = 1; i <= elements.length; i++) {
        blocks.push(<div key={i} className={styles[`item-${i}`]}>{elements?.[i - 1]}</div>)
    }
    //console.log(blocks);

    let rowsCount: number = 6

    if (elements.length < 4) {
        rowsCount = 2
    } else if (elements.length < 6) {
        rowsCount = 3
    } else if (elements.length < 8) {
        rowsCount = 4
    } else if (elements.length < 9) {
        rowsCount = 5
    }
    //console.log(elements);
    //console.log(rowsCount);


    return (
        <div className={styles.container} style={{ gridTemplateRows: `repeat(${rowsCount}, 140px)` }} {...props}>
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