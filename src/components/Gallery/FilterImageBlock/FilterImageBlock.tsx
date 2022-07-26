import { Field, Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux';
import { getAllBreeds } from '../../../redux/reducers/breeds-reducer';
import { FilterType, getImagesForGallery } from '../../../redux/reducers/gallery-reducer';
import { CustomSelect, OptionType } from '../../common/CustomSelect/CustomSelect';
import { MyButton } from '../../common/MyButton/MyButton';
import styles from './FilterImageBlock.module.scss'

type PropsType = {
    submitHandle: (values: FilterType) => void
}

export const FilterImageBlock = () => {
    const dispatch = useTypedDispatch()
    const filter = useTypedSelector(state => state.galleryRD.filter)
    useEffect(() => {
        dispatch(getAllBreeds())
    }, [])

    const breeds = useTypedSelector(state => state.breedsRD.breeds)

    const optionForOrder: OptionType[] = [
        { value: 'RANDOM', label: 'Random' },
        { value: 'ASC', label: 'Asc' },
        { value: 'DESC', label: 'Desc' },
    ]

    const optionForType: OptionType[] = [
        { value: 'gif,jpg,png', label: 'All' },
        { value: 'jpg,png', label: 'Static' },
        { value: 'gif', label: 'Animated' },
    ]

    const optionForBreed: OptionType[] =
        [{ value: '', label: 'None' }, ...breeds.map(breed => ({ value: breed.id, label: breed.name }))]

    const optionForLimit: OptionType[] = [
        { value: 5, label: '5 items per page' },
        { value: 10, label: '10 items per page' },
        { value: 15, label: '15 items per page' },
        { value: 20, label: '20 items per page' },
    ]

    //initialValues={{ order: 'RANDOM', type: 'gif,jpg,png', breed: '', limit: 5 }}

    return (
        <Formik
            enableReinitialize={true}
            initialValues={filter}
            onSubmit={(values) => {
                console.log('values from form', values);
                dispatch(getImagesForGallery(0, values))
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className={styles.formBody}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                <label htmlFor="order" className={styles.label}>ORDER</label>
                                <CustomSelect whiteBtn={true} selected={values.order} options={optionForOrder}
                                    setSelected={(v: string) => setFieldValue('order', v)} />
                            </div>
                        </div>

                        <div className={styles.column}>
                            <div className={styles.item}>
                                <label htmlFor="type" className={styles.label}>TYPE</label>
                                <CustomSelect whiteBtn={true} selected={values.type} options={optionForType}
                                    setSelected={(v: string) => setFieldValue('type', v)} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                <label htmlFor="breed" className={styles.label}>BREED</label>
                                <CustomSelect whiteBtn={true}
                                    startPlaceholder='None'
                                    selected={values.breed} options={optionForBreed}
                                    setSelected={(v: string) => setFieldValue('breed', v)} />
                            </div>
                        </div>
                        <div className={[styles.column, styles.columnWithBtn].join(' ')}>
                            <div className={styles.item}>
                                <label htmlFor="limit" className={styles.label}>LIMIT</label>
                                <CustomSelect whiteBtn={true}
                                    selected={values.limit} options={optionForLimit}
                                    setSelected={(v: string) => setFieldValue('limit', v)} />
                            </div>
                            <MyButton className={styles.sendBtn} type='submit' size='small' icon='_icon-update' />
                        </div>

                    </div>
                </Form>
            )}
        </Formik>
    )
}