import cn from 'classnames'
import { useState } from 'react'
import { ImageType } from '../../api/imagesAPI'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { deleteFromFavourites, saveToFavourites } from '../../redux/reducers/favourites-reducer'
import { MyButton } from '../common/MyButton/MyButton'
import styles from './FavouritesImage.module.scss'

type PropsType = {
    item: ImageType
}

export const FavouriteImage: React.FC<PropsType> = ({ item }) => {

    const dispatch = useTypedDispatch()
    const favourites = useTypedSelector(state => state.favouritesRD.favourites)
    const inToFromFavouritesProccess = useTypedSelector(state => state.favouritesRD.inToFromFavouritesProccess)
    const [activeImage, setActiveImage] = useState(false)

    const favItem = favourites.find(el => el.image_id === item.id)

    const addToFavourite = () => {
        console.log('add');
        dispatch(saveToFavourites({ image_id: item.id }, item.url))
    }

    const removeFromFavourites = () => {
        console.log('delete');
        if (favItem) {
            dispatch(deleteFromFavourites(favItem.id, item.id, item.url))
        }
    }

    return <div
        onClick={() => setActiveImage(!activeImage)}
        key={item.id}
        className={cn(styles.image, { [styles.active]: activeImage })}>
        <img src={item.url} alt="cat" />
        <MyButton className={styles.btn}
            onClick={() => { favItem ? removeFromFavourites() : addToFavourite() }}
            size="small"
            icon={favItem ? "_icon-favourite-color-all" : "_icon-favourite"}
            startColor="white"
            disabled={inToFromFavouritesProccess.some(id => id === item.id)} />
    </div>
}