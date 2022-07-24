import { useEffect } from "react"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { getFavourites } from "../../redux/reducers/favourites-reducer"
import { getAllVotes } from "../../redux/reducers/voting-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { InteractionBlock } from "../InteractionBlock/InteractionBlock"
import { UserActionsLog } from "../UserActionsLog/UserActionsLog"
import { PictureVoting } from "./PictureVoting/PictureVoting"


export const Voting = () => {

    const dispatch = useTypedDispatch()
    const image = useTypedSelector(state => state.imageRD.image)

    useEffect(() => {
        //dispatch(getNewImages())
        dispatch(getAllVotes())
        dispatch(getFavourites())
    }, [])

    return (
        <div>
            <Breadcrumbs />
            <PictureVoting />
            <UserActionsLog />
        </div>
    )
}