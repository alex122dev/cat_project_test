import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useTypedDispatch } from "../../hooks/redux"
import { actions, getAllBreeds } from "../../redux/reducers/breeds-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"



export const SearchPage = () => {

    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(getAllBreeds())

        return () => {
            dispatch(actions.setSearchBreedText(''))
        }
    }, [])

    return (
        <div>
            <Breadcrumbs />
            <Outlet />
        </div>
    )
}