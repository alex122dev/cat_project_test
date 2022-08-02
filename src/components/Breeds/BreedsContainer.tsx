import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { getAllBreeds } from "../../redux/reducers/breeds-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { CustomSelect } from "../common/CustomSelect/CustomSelect"
import { MyButton } from "../common/MyButton/MyButton"
import { Breeds } from "./Breeds"
import styles from './Breeds.module.scss'


export const BreedsContainer = () => {

    const dispatch = useTypedDispatch()
    //const location = useLocation() // {location.pathname === '/breeds' &&
    const breeds = useTypedSelector(state => state.breedsRD.breeds)

    const [customBreeds, setCustomBreeds] = useState(breeds)

    const [selected, setSelected] = useState('')

    /* const options = [
        { value: 'r', label: 'React' },
        { value: 'v', label: 'Vue' },
        { value: 'a', label: 'Angular' },
        { value: 'a words', label: 'Angular all all dffdgdfa gdfggfdvfdv' },
        { value: 'a long', label: 'Angularrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr' }
    ] */

    const options = [{ value: '', label: 'All breeds' }, ...breeds.map(breed => ({ value: breed.id, label: breed.name }))]


    const breedsFilter = () => {
        if (!selected) {
            setCustomBreeds(breeds)
        } else {
            setCustomBreeds(breeds.filter(breed => breed.id === selected))
        }

        console.log('customBreeds from func', customBreeds);
    }

    useEffect(() => {
        console.log('in effect breeds filter');
        breedsFilter()
    }, [selected, breeds])

    console.log('selected: ', selected);
    console.log('customBreeds', customBreeds);

    const sortHandlerAB = () => {
        console.log(1);
        setCustomBreeds(prev => [...prev].sort((a, b) => {
            if (a.name > b.name) {
                return 1
            }
            if (a.name < b.name) {
                return -1
            }
            return 0
        }))
    }

    const sortHandlerBA = () => {
        console.log(2);
        setCustomBreeds(prev => [...prev].sort((a, b) => {
            if (a.name > b.name) {
                return -1
            }
            if (a.name < b.name) {
                return 1
            }
            return 0
        }))
    }


    return (
        <div className={styles.breedsContainer}>
            <div className={styles.topBlock}>
                <Breadcrumbs />
                <CustomSelect selected={selected}
                    setSelected={setSelected}
                    options={options}
                    startPlaceholder={'All breeds'} />
                <MyButton onClick={sortHandlerAB} className={styles.sortBtn} size="small" icon="_icon-sort-AB" />
                <MyButton onClick={sortHandlerBA} className={styles.sortBtn} size="small" icon="_icon-sort-BA" />
            </div>
            <Breeds breeds={customBreeds} />
        </div>
    )
}