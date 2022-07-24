import cn from "classnames"
import { useEffect, useState } from "react"
import { CreateVoteType } from "../../../api/votesAPI"
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux"
import { deleteFromFavourites, saveToFavourites } from "../../../redux/reducers/favourites-reducer"
import { getRandomImage } from "../../../redux/reducers/image-reducer"
import { createVote } from "../../../redux/reducers/voting-reducer"
import { Preloader } from "../../common/Preloader/Preloader"
import styles from './PictureVoting.module.scss'



type PropsType = {
    //image: ImageType | null
}

export const PictureVoting: React.FC<PropsType> = () => {
    //console.log('dsfsdfsdfs : ', image);
    const image = useTypedSelector(state => state.imageRD.image)

    const dispatch = useTypedDispatch()
    const favourites = useTypedSelector(state => state.favouritesRD.favourites)
    const isFetching = useTypedSelector(state => state.voting.isFetching)
    const isFetchingImage = useTypedSelector(state => state.imageRD.isFetching)
    const inToFromFavouritesProccess = useTypedSelector(state => state.favouritesRD.inToFromFavouritesProccess)


    const favItem = favourites.find(item => image?.id === item.image_id)
    //console.log(favItem);


    useEffect(() => {
        dispatch(getRandomImage())
    }, [])

    const likeCallback = (ind: boolean) => {
        if (image) {
            const payload: CreateVoteType = {
                image_id: image.id,
                value: ind ? 1 : 0,
            }
            dispatch(createVote(payload, image.url))
        }
    }

    const addToFavourite = () => {
        if (image) {
            dispatch(saveToFavourites({ image_id: image.id }, image.url))
        }
    }

    const removeFromFavourites = () => {
        if (favItem) {
            dispatch(deleteFromFavourites(favItem.id, favItem.image_id, favItem.image.url))
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.image}>
                {image
                    ? <img src={image.url} alt="cat" />
                    : <Preloader className={styles.preloader} />}
            </div>
            <div className={styles.votingBox}>
                <button
                    disabled={isFetching || isFetchingImage}
                    className={cn(styles.votingBtn, { "_icon-like": true, [styles.likeBtn]: true })}
                    onClick={() => likeCallback(true)} />
                <button
                    disabled={inToFromFavouritesProccess.some(id => id === image?.id || id === favItem?.id) || isFetching || isFetchingImage}
                    className={cn(styles.votingBtn, {
                        "_icon-favourite": !favItem,
                        "_icon-favourite-color-all": favItem,
                        [styles.favouriteBtn]: true
                    })}
                    onClick={() => {
                        favItem ? removeFromFavourites() : addToFavourite()
                    }} />
                <button
                    disabled={isFetching || isFetchingImage}
                    className={cn(styles.votingBtn, { "_icon-dislike": true, [styles.dislikeBtn]: true })}
                    onClick={() => likeCallback(false)} />
            </div>
        </div>
    )
}