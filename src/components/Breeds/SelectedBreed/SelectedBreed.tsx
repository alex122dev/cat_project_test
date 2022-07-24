import { useParams } from "react-router-dom"
import { useTypedSelector } from "../../../hooks/redux"
import { Breadcrumbs } from "../../common/Breadcrumbs/Breadcrumbs"
import { NoItemFound } from "../../common/NoItemFound/NoItemFound"
import { BreedItem } from "./BreedItem"


export const SelectedBreed = () => {

    const breeds = useTypedSelector(state => state.breedsRD.breeds)

    const { breedId } = useParams()
    //console.log(breedId);
    const selectedBreed = breeds.find(item => item.id === breedId)


    if (!selectedBreed) {
        return <NoItemFound />
    }

    return (
        <div>
            <BreedItem selectedBreed={selectedBreed} />
        </div>
    )


}