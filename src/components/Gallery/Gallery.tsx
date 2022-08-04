import { useEffect } from "react"
import { createSearchParams, useSearchParams } from "react-router-dom"
import { OrderType } from "../../api/imagesAPI"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { FilterType, getImagesForGallery } from "../../redux/reducers/gallery-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { MyButton } from "../common/MyButton/MyButton"
import { InteractionBlock } from "../InteractionBlock/InteractionBlock"
import { FilterImageBlock } from "./FilterImageBlock/FilterImageBlock"
import styles from './Gallery.module.scss'
import { GalleryGrid } from "./GalleryGrid/GalleryGrid"

export const Gallery = () => {

    const dispatch = useTypedDispatch()
    const filter = useTypedSelector(state => state.galleryRD.filter)
    const currentPage = useTypedSelector(state => state.galleryRD.currentPage)

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

        console.log('actualFilter: ', actualFilter);
        console.log('actualCurrentPage: ', actualCurrentPage);

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

        console.log('params: ', params);

        setSearchParams(params)
    }, [filter, currentPage])

    return (
        <div className={styles.container}>
            <div className={styles.topBlock}>
                <Breadcrumbs />
                <button className={[styles.uploadBtn, '_icon-upload'].join(' ')}><span>Upload</span></button>
            </div>
            <FilterImageBlock />
            <GalleryGrid />
        </div>
    )
}