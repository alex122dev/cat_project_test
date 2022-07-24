import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { actions, getBreedsByName } from '../../redux/reducers/breeds-reducer'
import { Burger } from '../common/Burger/Burger'
import { MyButton } from '../common/MyButton/MyButton'
import { Navbar } from '../Navbar/Navbar'
import styles from './InteractionBlock.module.scss'


export const InteractionBlock = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

    const [activeMenu, setActiveMenu] = useState(false)

    const location = useLocation()


    const navigate = useNavigate()
    return (
        <div className={styles.body}>

            {!isDesktop && <>
                <MyButton onClick={(e) => setActiveMenu(!activeMenu)}
                    className={styles.burgerBtn}
                    size='big'><Burger activeBurger={activeMenu} setActiveBurger={setActiveMenu} /></MyButton>
                <div className={cn(styles.menu, { [styles.active]: activeMenu })}>
                    <Navbar minMenu={isMobile} />
                    <MyButton onClick={(e) => setActiveMenu(!activeMenu)} className={styles.closeMenu} size='big' icon='_icon-close' />
                </div>
            </>}
            <Search />
            <MyButton
                onClick={() => navigate('/likes')}
                className={location.pathname === '/likes' && styles.activeBtn}
                size='big'
                icon='_icon-like' />
            <MyButton onClick={() => navigate('/favourites')}
                className={location.pathname === '/favourites' && styles.activeBtn}
                size='big'
                icon='_icon-favourite' />
            <MyButton
                onClick={() => navigate('/dislikes')}
                className={location.pathname === '/dislikes' && styles.activeBtn}
                size='big'
                icon='_icon-dislike' />


        </div>
    )
}

export const Search = () => {
    const searchBreedText = useTypedSelector(state => state.breedsRD.searchBreedText)
    const [searchText, setSearchText] = useState(searchBreedText)
    const dispathc = useTypedDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    //console.log(searchText);

    useEffect(() => {
        setSearchText(searchBreedText)
    }, [searchBreedText])

    const searchHandle = () => {
        console.log(searchText);
        dispathc(actions.setSearchBreedText(searchText))
        if (location.pathname !== '/search') {
            //console.log('navigate');
            navigate('/search')
        }
        //dispathc(getBreedsByName(searchText))
    }

    return (
        <div className={styles.search}>
            <input placeholder='Search for breeds by name' type="text" onChange={(e) => setSearchText(e.currentTarget.value)}
                value={searchText} />
            <MyButton
                onClick={searchHandle}
                size='small'
                className={styles.searchBtn}
                startColor='pink'
                icon='_icon-search' />
        </div>
    )
}