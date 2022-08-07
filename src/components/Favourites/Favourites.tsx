import React, { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { getFavourites } from "../../redux/reducers/favourites-reducer";
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs";
import { NoItemFound } from "../common/NoItemFound/NoItemFound";
import { Preloader } from "../common/Preloader/Preloader";
import { FavouriteImage } from "../FavouritesImage/FavouritesImage";
import { GridPattern } from "../GridPattern/GridPattern";
import styles from './Favourites.module.scss'


export const Favourites: React.FC = () => {

    const dispatch = useTypedDispatch()
    const favourites = useTypedSelector(state => state.favouritesRD.favourites)
    const isFetching = useTypedSelector(state => state.favouritesRD.isFetching)

    useEffect(() => {
        dispatch(getFavourites())
    }, [])

    const gridItems = favourites.map(item => <FavouriteImage item={item.image} />)

    const gridBlocks = []
    for (let i = 0; i < gridItems.length; i += 10) {
        gridBlocks.push(gridItems.slice(i, i + 10))
    }


    return (
        <div className={styles.container}>
            <Breadcrumbs />
            {isFetching && <Preloader className={styles.preloader} />}
            {!isFetching && favourites.length === 0 && <NoItemFound />}
            {gridBlocks.map((block, i) => <GridPattern key={i} elements={block} />)}
        </div>
    )
}