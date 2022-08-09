import { useEffect } from "react"
import { VoteType } from "../../api/votesAPI"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { getAllVotes } from "../../redux/reducers/voting-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { NoItemFound } from "../common/NoItemFound/NoItemFound"
import { Preloader } from "../common/Preloader/Preloader"
import { GridPattern } from "../GridPattern/GridPattern"
import styles from './Dislikes.module.scss'

export const Dislikes = () => {

    const dispatch = useTypedDispatch()
    const dislikes = useTypedSelector(state => state.voting.votes).filter(vote => vote.value === 0)
    const isFetchingVotes = useTypedSelector(state => state.voting.isFetchingVotes)

    useEffect(() => {
        dispatch(getAllVotes())
    }, [])

    const gridItems = dislikes.map(dislike => <DislikesImage item={dislike} />)

    const gridBlocks = []
    for (let i = 0; i < gridItems.length; i += 10) {
        gridBlocks.push(gridItems.slice(i, i + 10))
    }


    return (
        <div className={styles.container}>
            <Breadcrumbs />
            {isFetchingVotes && <Preloader className={styles.preloader} />}
            {!isFetchingVotes && dislikes.length === 0 && <NoItemFound />}
            {gridBlocks.map((block, i) => <GridPattern key={i} elements={block} />)}
        </div>
    )
}

type PropsType = {
    item: VoteType
}

export const DislikesImage: React.FC<PropsType> = ({ item }) => {
    return (
        <div className={styles.image}>
            <img src={item.image.url} alt="cat" />
        </div>
    )
}