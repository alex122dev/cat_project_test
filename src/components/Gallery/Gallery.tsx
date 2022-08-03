import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { MyButton } from "../common/MyButton/MyButton"
import { InteractionBlock } from "../InteractionBlock/InteractionBlock"
import { FilterImageBlock } from "./FilterImageBlock/FilterImageBlock"
import styles from './Gallery.module.scss'
import { GalleryGrid } from "./GalleryGrid/GalleryGrid"

export const Gallery = () => {
    return (
        <div>
            <div className={styles.topBlock}>
                <Breadcrumbs />
                <button className={[styles.uploadBtn, '_icon-upload'].join(' ')}><span>Upload</span></button>
            </div>
            <FilterImageBlock />
            <GalleryGrid />
        </div>
    )
}