import { useState } from "react"
import { Preloader } from "../../common/Preloader/Preloader"
import styles from './UploadModal.module.scss'


type PropsType = {
    file: File
}

export const PreviewPhoto: React.FC<PropsType> = ({ file }) => {
    const [preview, setPreview] = useState<string | null>(null)

    const reader = new FileReader()
    reader.onload = () => {
        setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    return <>
        {preview
            ? <div className={styles.previewImage}>
                <img src={preview} alt="avatar" />
            </div>
            : <Preloader />}
    </>
}