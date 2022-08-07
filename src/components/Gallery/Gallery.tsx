import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { FilterType, getImagesForGallery, getMoreImages } from "../../redux/reducers/gallery-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { DefaultButton } from "../common/DefaultButton/DefaultButton"
import { Modal } from "../common/Modal/Modal"
import { MyButton } from "../common/MyButton/MyButton"
import { FilterImageBlock } from "./FilterImageBlock/FilterImageBlock"
import styles from './Gallery.module.scss'
import { GalleryGrid } from "./GalleryGrid/GalleryGrid"
import { UploadModal } from "./UploadModal/UploadModal"

export const Gallery = () => {

    const dispatch = useTypedDispatch()
    const isFetching = useTypedSelector(state => state.galleryRD.isFetching)
    const images = useTypedSelector(state => state.galleryRD.images)
    const filter = useTypedSelector(state => state.galleryRD.filter)
    const currentPage = useTypedSelector(state => state.galleryRD.currentPage)


    const [isActiveModal, setActiveModal] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const paramsFromUrlString = Object.fromEntries(Array.from(searchParams))
        //console.log('paramsFromUrlString: ', paramsFromUrlString);

        let actualFilter: FilterType = filter
        let actualCurrentPage: number = currentPage

        if (paramsFromUrlString.page) actualCurrentPage = Number(paramsFromUrlString.page)
        if (paramsFromUrlString.order === 'RANDOM' ||
            paramsFromUrlString.order === 'ASC' ||
            paramsFromUrlString.order === 'DESC') actualFilter = { ...actualFilter, order: paramsFromUrlString.order }

        if (paramsFromUrlString.type === 'gif,jpg,png' ||
            paramsFromUrlString.type === 'jpg,png' ||
            paramsFromUrlString.type === 'gif') actualFilter = { ...actualFilter, type: paramsFromUrlString.type }

        //console.log('actualFilter: ', actualFilter);
        //console.log('actualCurrentPage: ', actualCurrentPage);

        dispatch(getImagesForGallery(actualCurrentPage, actualFilter))

    }, [])

    useEffect(() => {
        const params: { [key: string]: string } = {}

        Object.keys(filter).map(key => {
            const value = filter[key as keyof typeof filter]
            if (value && key !== 'limit') {
                params[key] = value.toString()
            }
        })

        if (currentPage !== 1) params.page = currentPage.toString()

        // console.log('params: ', params);
        setSearchParams(params)
    }, [filter, currentPage])


    const getMoreImagesHandler = () => {
        dispatch(getMoreImages(currentPage + 1, filter))
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topBlock}>
                    <Breadcrumbs />
                    <DefaultButton className={styles.uploadBtn}
                        onClick={() => setActiveModal(true)}
                        startColor="lightpink"><span className="_icon-upload" /> Upload</DefaultButton>
                </div>
                <FilterImageBlock />
                <GalleryGrid />
                {images.length > 0 && <DefaultButton startColor='pink'
                    onClick={getMoreImagesHandler}
                    className={styles.showmoreBtn}
                    disabled={isFetching}
                >Show More</DefaultButton>}
            </div>
            <UploadModal IsActiveModal={isActiveModal} setActiveModal={setActiveModal} />
        </>
    )
}