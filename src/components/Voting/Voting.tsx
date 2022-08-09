import { useEffect } from "react"
import { useTypedDispatch } from "../../hooks/redux"
import { getFavourites } from "../../redux/reducers/favourites-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { UserActionsLog } from "../UserActionsLog/UserActionsLog"
import { PictureVoting } from "./PictureVoting/PictureVoting"
import styles from './Voting.module.scss'

export const Voting = () => {

    return (
        <div className={styles.voting}>
            <Breadcrumbs />
            <PictureVoting />
            <UserActionsLog />
        </div>
    )
}