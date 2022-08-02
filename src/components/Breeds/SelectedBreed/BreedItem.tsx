import { useEffect, useState } from "react"
import { BreedType } from "../../../api/breedsAPI"
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux"
import { getImageForBreedsSlider } from "../../../redux/reducers/breeds-reducer"
import { Preloader } from "../../common/Preloader/Preloader"
import { BreedsSlider } from "./BreedsSlider/BreedsSlider"
import styles from './SelectedBreed.module.scss'

type PropsType = {
    selectedBreed: BreedType
}

export const BreedItem: React.FC<PropsType> = ({ selectedBreed }) => {
    const dispatch = useTypedDispatch()

    /* const breedsSliderImages = [
        { breeds: [], id: 'xnzzM6MBI', url: 'https://cdn2.thecatapi.com/images/xnzzM6MBI.jpg', width: 2592, height: 1629 },
        { breeds: [], id: 'EHG3sOpAM', url: 'https://cdn2.thecatapi.com/images/EHG3sOpAM.jpg', width: 1600, height: 1067 },
        { breeds: [], id: 'unPP08xOZ', url: 'https://cdn2.thecatapi.com/images/unPP08xOZ.jpg', width: 2136, height: 2848 },
        { breeds: [], id: 'itfFA4NWS', url: 'https://cdn2.thecatapi.com/images/itfFA4NWS.jpg', width: 1280, height: 914 },
        { breeds: [], id: '0XYvRd7oD', url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg', width: 1204, height: 1445 },
        { breeds: [], id: 'Kq8__jmkT', url: 'https://cdn2.thecatapi.com/images/Kq8__jmkT.jpg', width: 1527, height: 1286 },
        { breeds: [], id: 'TGuAku7fM', url: 'https://cdn2.thecatapi.com/images/TGuAku7fM.jpg', width: 1920, height: 1279 },
        { breeds: [], id: 'p6x60nX6U', url: 'https://cdn2.thecatapi.com/images/p6x60nX6U.jpg', width: 1032, height: 774 },
        { breeds: [], id: 'tv8tNeYaU', url: 'https://cdn2.thecatapi.com/images/tv8tNeYaU.jpg', width: 1600, height: 1200 },
        { breeds: [], id: 'g1j3wRjgx', url: 'https://cdn2.thecatapi.com/images/g1j3wRjgx.jpg', width: 1024, height: 1024 },
    ] */
    const breedsSliderImages = useTypedSelector(state => state.breedsRD.breedsSliderImages)
    const isFetching = useTypedSelector(state => state.breedsRD.isFetching)

    const [firstImageReady, setFirstImageReady] = useState(false)

    if (breedsSliderImages.length > 0) {
        const firstImage = new Image()
        firstImage.src = breedsSliderImages[0].url
        firstImage.onload = function () {
            setFirstImageReady(true)
        }
    }


    const elementsForSlider = breedsSliderImages.map(item => <div className={styles.image}>
        <img src={item.url} alt="" />
    </div>)

    useEffect(() => {
        dispatch(getImageForBreedsSlider(selectedBreed.id, 5))
    }, [selectedBreed])

    return (
        <div className={styles.container}>
            {isFetching || !firstImageReady
                ? <Preloader className={styles.preloader} />
                : <BreedsSlider elements={elementsForSlider} className={styles.slider} />}
            <div className={styles.contentBlock}>
                <h3 className={styles.name}>{selectedBreed.name}</h3>
                <div className={styles.info}>
                    <p className={styles.description}>{selectedBreed.description}</p>
                    <div className={styles.items}>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                <p className={styles.itemText}><span className={[styles.itemTitle, styles.itemTitleTemp].join(' ')}>Temperament: </span>
                                    {selectedBreed.temperament}</p>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                <p className={styles.itemText}><span className={styles.itemTitle}>Origin: </span>
                                    {selectedBreed.origin}</p>
                            </div>
                            <div className={styles.item}>
                                <p className={styles.itemText}><span className={styles.itemTitle}>Weight: </span>
                                    {selectedBreed.weight.metric} kgs</p>
                            </div>
                            <div className={styles.item}>
                                <p className={styles.itemText}><span className={styles.itemTitle}>Life span: </span>
                                    {selectedBreed.life_span} years</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}