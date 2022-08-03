import { useTypedSelector } from '../../hooks/redux'
import { Breeds } from '../Breeds/Breeds'
import { NoItemFound } from '../common/NoItemFound/NoItemFound'
import styles from './SearchPage.module.scss'

export const SearchContainer = () => {
    const breeds = useTypedSelector(state => state.breedsRD.breeds)
    const searchBreedText = useTypedSelector(state => state.breedsRD.searchBreedText)

    const regexp = new RegExp(searchBreedText, 'i')
    const findBreeds = breeds.filter(breed => regexp.test(breed.name))


    console.log('findBreeds', findBreeds);

    return (
        <div className={styles.container}>
            <p className={styles.text}>Search results for: <span>{searchBreedText}</span></p>
            {findBreeds.length === 0
                ? <NoItemFound />
                : <Breeds breeds={findBreeds} />}
        </div>
    )
}