import cn from "classnames";
import React, { useEffect, useState } from "react";
import { FavouritesType } from "../../api/favouritesAPI";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { deleteFromFavourites, getFavourites } from "../../redux/reducers/favourites-reducer";
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs";
import { MyButton } from "../common/MyButton/MyButton";
import { NoItemFound } from "../common/NoItemFound/NoItemFound";
import { Preloader } from "../common/Preloader/Preloader";
import { GridPattern } from "../GridPattern/GridPattern";
import styles from './Favourites.module.scss'


export const Favourites: React.FC = () => {

    const dispatch = useTypedDispatch()
    const favourites = useTypedSelector(state => state.favouritesRD.favourites)
    const isFetching = useTypedSelector(state => state.favouritesRD.isFetching)
    const inToFromFavouritesProccess = useTypedSelector(state => state.favouritesRD.inToFromFavouritesProccess)
    /* const favourites = [
        {
            created_at: "2022-07-17T09:58:40.000Z",
            id: 100043195,
            image: { id: '5np', url: 'https://cdn2.thecatapi.com/images/5np.jpg' },
            image_id: "5np",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:06:59.000Z",
            id: 100043900,
            image: { id: '2i3B56zSG', url: 'https://cdn2.thecatapi.com/images/2i3B56zSG.png' },
            image_id: "2i3B56zSG",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:19:07.000Z",
            id: 100043913,
            image: { id: 'dbf', url: 'https://cdn2.thecatapi.com/images/dbf.gif' },
            image_id: "dbf",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:32:55.000Z",
            id: 100043938,
            image: { id: '54i', url: 'https://cdn2.thecatapi.com/images/54i.jpg' },
            image_id: "54i",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-17T09:58:40.000Z",
            id: 100043195,
            image: { id: '5np', url: 'https://cdn2.thecatapi.com/images/5np.jpg' },
            image_id: "5np",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:06:59.000Z",
            id: 100043900,
            image: { id: '2i3B56zSG', url: 'https://cdn2.thecatapi.com/images/2i3B56zSG.png' },
            image_id: "2i3B56zSG",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:19:07.000Z",
            id: 100043913,
            image: { id: 'dbf', url: 'https://cdn2.thecatapi.com/images/dbf.gif' },
            image_id: "dbf",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:32:55.000Z",
            id: 100043938,
            image: { id: '54i', url: 'https://cdn2.thecatapi.com/images/54i.jpg' },
            image_id: "54i",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-17T09:58:40.000Z",
            id: 100043195,
            image: { id: '5np', url: 'https://cdn2.thecatapi.com/images/5np.jpg' },
            image_id: "5np",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:06:59.000Z",
            id: 100043900,
            image: { id: '2i3B56zSG', url: 'https://cdn2.thecatapi.com/images/2i3B56zSG.png' },
            image_id: "2i3B56zSG",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:19:07.000Z",
            id: 100043913,
            image: { id: 'dbf', url: 'https://cdn2.thecatapi.com/images/dbf.gif' },
            image_id: "dbf",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:32:55.000Z",
            id: 100043938,
            image: { id: '54i', url: 'https://cdn2.thecatapi.com/images/54i.jpg' },
            image_id: "54i",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-17T09:58:40.000Z",
            id: 100043195,
            image: { id: '5np', url: 'https://cdn2.thecatapi.com/images/5np.jpg' },
            image_id: "5np",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:06:59.000Z",
            id: 100043900,
            image: { id: '2i3B56zSG', url: 'https://cdn2.thecatapi.com/images/2i3B56zSG.png' },
            image_id: "2i3B56zSG",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:19:07.000Z",
            id: 100043913,
            image: { id: 'dbf', url: 'https://cdn2.thecatapi.com/images/dbf.gif' },
            image_id: "dbf",
            sub_id: null,
            user_id: "ag5m0n",
        },
        {
            created_at: "2022-07-18T11:32:55.000Z",
            id: 100043938,
            image: { id: '54i', url: 'https://cdn2.thecatapi.com/images/54i.jpg' },
            image_id: "54i",
            sub_id: null,
            user_id: "ag5m0n",
        },
    ] */



    useEffect(() => {
        dispatch(getFavourites())
    }, [])

    const gridItems = favourites.map(item => <FavouriteImage item={item} />)

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

type PropsType = {
    item: FavouritesType
}

export const FavouriteImage: React.FC<PropsType> = ({ item }) => {

    const dispatch = useTypedDispatch()
    const inToFromFavouritesProccess = useTypedSelector(state => state.favouritesRD.inToFromFavouritesProccess)
    const [activeImage, setActiveImage] = useState(false)

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