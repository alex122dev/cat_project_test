import { useEffect } from "react"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { UserActionsType } from "../../redux/reducers/userActionsLog-reducer"
import { getAllVotes } from "../../redux/reducers/voting-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { NoItemFound } from "../common/NoItemFound/NoItemFound"
import { Preloader } from "../common/Preloader/Preloader"
import { GridPattern } from "../GridPattern/GridPattern"
import styles from './Likes.module.scss'

export const Likes = () => {
    const userActions = useTypedSelector(state => state.userActionsRD.userActions)
    const likes = userActions.filter(item => item.type === 'Likes')

    const gridItems = likes.map(like => <LikeImage item={like} />)

    const gridBlocks = []
    for (let i = 0; i < gridItems.length; i += 10) {
        gridBlocks.push(gridItems.slice(i, i + 10))
    }


    return (
        <div className={styles.container}>
            <Breadcrumbs />
            {likes.length === 0 && <NoItemFound />}
            {gridBlocks.map((block, i) => <GridPattern key={i} elements={block} />)}
        </div>
    )
}

type PropsType = {
    item: UserActionsType
}

export const LikeImage: React.FC<PropsType> = ({ item }) => {
    return (
        <div className={styles.image}>
            <img src={item.url} alt="cat" />
        </div>
    )
}