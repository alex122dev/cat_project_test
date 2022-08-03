import cn from 'classnames'
import { useState } from 'react'
import { FavouritesType } from '../../api/favouritesAPI'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { deleteFromFavourites, saveToFavourites } from '../../redux/reducers/favourites-reducer'
import { MyButton } from '../common/MyButton/MyButton'
import styles from './FavouritesImage.module.scss'

type PropsType = {
    item: FavouritesType
}

export const FavouriteImage: React.FC<PropsType> = ({ item }) => {

    const dispatch = useTypedDispatch()
    const inToFromFavouritesProccess = useTypedSelector(state => state.favouritesRD.inToFromFavouritesProccess)
    const [activeImage, setActiveImage] = useState(false)


    /* const addToFavourite = () => {
        if (image) {
            dispatch(saveToFavourites({ image_id: image.id }, image.url))
        }
    } */

    const removeFromFavourites = () => {
        dispatch(deleteFromFavourites(item.id, item.image_id, item.image.url))
    }

    return <div
        onClick={() => setActiveImage(!activeImage)}
        key={item.image_id}
        className={cn(styles.image, { [styles.active]: activeImage })}>
        <img src={item.image.url} alt="cat" />
        <MyButton className={styles.btn}
            onClick={removeFromFavourites}
            size="small"
            icon="_icon-favourite-color-all"
            startColor="white"
            disabled={inToFromFavouritesProccess.some(id => id === item.id)} />
    </div>
}