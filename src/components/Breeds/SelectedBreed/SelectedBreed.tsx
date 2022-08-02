import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux"
import { getAllBreeds } from "../../../redux/reducers/breeds-reducer"
import { Breadcrumbs } from "../../common/Breadcrumbs/Breadcrumbs"
import { NoItemFound } from "../../common/NoItemFound/NoItemFound"
import { BreedItem } from "./BreedItem"


export const SelectedBreed = () => {
    //const dispatch = useTypedDispatch()

    const breeds = useTypedSelector(state => state.breedsRD.breeds)

    const { breedId } = useParams()
    //console.log(breedId);
    const selectedBreed = breeds.find(item => item.id === breedId)

    if (!selectedBreed) {
        return <NoItemFound />
    }

    return (
        <div>
            <Breadcrumbs />
            <BreedItem selectedBreed={selectedBreed} />
        </div>
    )


}