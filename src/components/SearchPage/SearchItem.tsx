import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { getAllBreeds } from "../../redux/reducers/breeds-reducer"
import { BreedItem } from "../Breeds/SelectedBreed/BreedItem"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import { NoItemFound } from "../common/NoItemFound/NoItemFound"


export const SearchItem = () => {


    const breeds = useTypedSelector(state => state.breedsRD.breeds)

    const { searchId } = useParams()
    //console.log(breedId);
    const selectedBreed = breeds.find(item => item.id === searchId)


    if (!selectedBreed) {
        return <NoItemFound />
    }

    return (
        <div>
            <BreedItem selectedBreed={selectedBreed} />
        </div>
    )
}