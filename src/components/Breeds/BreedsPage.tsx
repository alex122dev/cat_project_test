import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useTypedDispatch } from "../../hooks/redux"
import { getAllBreeds } from "../../redux/reducers/breeds-reducer"


export const BreedsPage = () => {
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(getAllBreeds())
    }, [])

    return (
        <Outlet />
    )
}