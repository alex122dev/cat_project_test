import { useEffect, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import styles from './Breeds.module.scss'
import { BreedType } from '../../api/breedsAPI'
import { Preloader } from '../common/Preloader/Preloader'
import { NoItemFound } from '../common/NoItemFound/NoItemFound'
import { GridPattern } from '../GridPattern/GridPattern'
import { getAllBreeds } from '../../redux/reducers/breeds-reducer'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { Breadcrumbs } from '../common/Breadcrumbs/Breadcrumbs'


type BreedsPropsType = {
    breeds: BreedType[]
}

export const Breeds: React.FC<BreedsPropsType> = ({ breeds }) => {

    //const breeds = useTypedSelector(state => state.breedsRD.breeds)
    const isFetching = useTypedSelector(state => state.breedsRD.isFetching)


    const gridItems = breeds.filter(item => item.image).map(breed => <BreedsImage item={breed} />)

    //console.log(gridItems);


    const gridBlocks = []
    for (let i = 0; i < gridItems.length; i += 10) {
        gridBlocks.push(gridItems.slice(i, i + 10))
    }


    return (
        <div className={styles.container}>
            {isFetching && <Preloader className={styles.preloader} />}
            {!isFetching && breeds.length === 0 && <NoItemFound />}
            {gridBlocks.map((block, i) => <GridPattern key={i} elements={block} />)}
        </div>
    )
}

type PropsType = {
    item: BreedType
}

export const BreedsImage: React.FC<PropsType> = ({ item }) => {
    const [activeImage, setActiveImage] = useState(false)

    return (
        <div className={cn(styles.image, { [styles.active]: activeImage })}
            key={item.id}
            onClick={() => setActiveImage(!activeImage)}>
            <img src={item.image.url} alt={item.name} />
            <Link to={item.id}
                className={styles.btn}>{item.name}</Link>
        </div>
    )
}