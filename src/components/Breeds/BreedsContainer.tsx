import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { getAllBreeds } from "../../redux/reducers/breeds-reducer"
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs"
import styles from './Breeds.module.scss'


export const BreedsContainer = () => {

    const dispatch = useTypedDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(getAllBreeds())
    }, [])

    return (
        <div className={styles.breedsContainer}>
            <div>
                <Breadcrumbs />
                {location.pathname === '/breeds'}
            </div>
            <Outlet />
        </div>
    )
}