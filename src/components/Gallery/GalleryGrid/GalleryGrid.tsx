import { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux'
import { getFavourites } from '../../../redux/reducers/favourites-reducer'
import { getMoreImages } from '../../../redux/reducers/gallery-reducer'
import { DefaultButton } from '../../common/DefaultButton/DefaultButton'
import { NoItemFound } from '../../common/NoItemFound/NoItemFound'
import { Preloader } from '../../common/Preloader/Preloader'
import { FavouriteImage } from '../../FavouritesImage/FavouritesImage'
import { GridPattern } from '../../GridPattern/GridPattern'
import styles from './GalleryGrid.module.scss'

export const GalleryGrid = () => {

    const dispatch = useTypedDispatch()
    const images = useTypedSelector(state => state.galleryRD.images)
    const isFetching = useTypedSelector(state => state.galleryRD.isFetching)

    const gridItems = images.map(image => <FavouriteImage item={image} />)

    const gridBlocks = []
    for (let i = 0; i < gridItems.length; i += 10) {
        gridBlocks.push(gridItems.slice(i, i + 10))
    }

    useEffect(() => {
        dispatch(getFavourites())
    }, [])

    return (
        <div className={styles.galleryGrid}>
            {!isFetching && images.length === 0 && <NoItemFound />}
            {gridBlocks.map((block, i) => <GridPattern key={i} elements={block} />)}
            {isFetching && <Preloader className={styles.preloader} />}
        </div>
    )
}

