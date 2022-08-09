import cn from "classnames"
import { useEffect, useState } from "react"
import { CreateVoteType } from "../../../api/votesAPI"
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux"
import { deleteFromFavourites, getFavourites, saveToFavourites } from "../../../redux/reducers/favourites-reducer"
import { createVote, getRandomImage } from "../../../redux/reducers/voting-reducer"
import { Preloader } from "../../common/Preloader/Preloader"
import styles from './PictureVoting.module.scss'



export const PictureVoting: React.FC = () => {

    const image = useTypedSelector(state => state.voting.image)

    const dispatch = useTypedDispatch()
    const favourites = useTypedSelector(state => state.favouritesRD.favourites)
    const isFetchingImage = useTypedSelector(state => state.voting.isFetchingImage)
    const inToFromFavouritesProccess = useTypedSelector(state => state.favouritesRD.inToFromFavouritesProccess)

    const [isReadyImg, setIsReadyImg] = useState(false)

    //console.log('isReadyImg: ', isReadyImg);


    if (image) {
        const img = new Image()
        img.src = image.url
        img.onload = () => {
            setIsReadyImg(true)
        }
    }

    useEffect(() => {
        if (!image) {
            setIsReadyImg(false)
        }
    }, [image])

    const favItem = favourites.find(item => image?.id === item.image_id)
    //console.log(favItem);


    useEffect(() => {
        dispatch(getRandomImage())
        dispatch(getFavourites())
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
        if (favItem && image) {
            dispatch(deleteFromFavourites(favItem.id, image.id, image.url))
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.image}>
                {(image && isReadyImg)
                    ? <img src={image.url} alt="cat" />
                    : <Preloader className={styles.preloader} />}
            </div>
            <div className={styles.votingBox}>
                <button
                    disabled={isFetchingImage}
                    className={cn(styles.votingBtn, { "_icon-like": true, [styles.likeBtn]: true })}
                    onClick={() => likeCallback(true)} />
                <button
                    disabled={inToFromFavouritesProccess.some(id => id === image?.id || id === favItem?.id) || isFetchingImage}
                    className={cn(styles.votingBtn, {
                        "_icon-favourite": !favItem,
                        "_icon-favourite-color-all": favItem,
                        [styles.favouriteBtn]: true
                    })}
                    onClick={() => {
                        favItem ? removeFromFavourites() : addToFavourite()
                    }} />
                <button
                    disabled={isFetchingImage}
                    className={cn(styles.votingBtn, { "_icon-dislike": true, [styles.dislikeBtn]: true })}
                    onClick={() => likeCallback(false)} />
            </div>
        </div>
    )
}