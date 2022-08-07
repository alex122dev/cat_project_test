import { useRef, useState } from 'react'
import { DefaultButton } from '../../common/DefaultButton/DefaultButton'
import { Modal } from '../../common/Modal/Modal'
import { MyButton } from '../../common/MyButton/MyButton'
import placeholderImg from '../../../assets/image/main/upload-img.svg'
import styles from './UploadModal.module.scss'
import { PreviewPhoto } from './PreviewImage'
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux'
import { UploadImage } from '../../../redux/reducers/gallery-reducer'
import cn from 'classnames'
import { SmallPreloader } from '../../common/SmallPreloader/SmallPreloader'


type PropsType = {
    IsActiveModal: boolean
    setActiveModal: (b: boolean) => void
}


export const UploadModal: React.FC<PropsType> = ({ IsActiveModal, setActiveModal }) => {

    const dipsatch = useTypedDispatch()
    const isUploading = useTypedSelector(state => state.galleryRD.isUploading)
    const uploadingSuccess = useTypedSelector(state => state.galleryRD.uploadingSuccess)
    const uploadingError = useTypedSelector(state => state.galleryRD.uploadingError)
    //const isUploading = true

    const uploadInpRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | null>(null)

    const uploadHandler = () => {
        if (image) {
            dipsatch(UploadImage(image))
        }
    }

    return (
        <Modal isActive={IsActiveModal} setActive={setActiveModal}>
            <div className={styles.container}>
                <MyButton size='small' icon='_icon-close' className={styles.closeBtn} onClick={() => setActiveModal(false)} />
                <h3 className={styles.title}>Upload a .jpg or .png Cat Image</h3>
                <p className={styles.text}>
                    Any uploads must comply with the <a href="https://thecatapi.com/privacy" target="_blank">upload guidelines</a> or face deletion.</p>
                <div
                    onClick={() => uploadInpRef.current?.click()}
                    className={styles.previewBlock}>
                    {image
                        ? <PreviewPhoto file={image} />
                        : <>
                            <p className={styles.tipText}><span>Drag here</span> your file or <span>Click here</span> to upload</p>
                            <div className={styles.placeholderImg}>
                                <img src={placeholderImg} alt="picture" />
                            </div>
                        </>}
                    <input type="file" ref={uploadInpRef}
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setImage(e.target.files[0])
                            }
                        }}
                        className={styles.uploadInpRef} />
                </div>
                <p className={styles.name}>{image ? image.name : 'No file selected'}</p>
                {image && <DefaultButton
                    onClick={uploadHandler}
                    startColor='pink'
                    className={cn(styles.uploadBtn)}>
                    {isUploading && <SmallPreloader className={styles.uploadingPreloader} />}
                    {isUploading ? 'UPLOADING' : 'UPLOAD PHOTO'}</DefaultButton>}
                {uploadingSuccess &&
                    <p className={styles.message}><span className={['_icon-success', styles.success].join(' ')} /> Thanks for the Upload - Cat found!</p>
                }
                {uploadingError &&
                    <p className={styles.message}><span className={['_icon-error', styles.error].join(' ')} /> No Cat found - try a different one</p>
                }

            </div>
        </Modal>
    )
}