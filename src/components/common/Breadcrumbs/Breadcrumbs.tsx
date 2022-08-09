import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MyButton } from '../MyButton/MyButton';
import styles from './Breadcrumbs.module.scss'


type PropsType = {
    className?: string
}

export const Breadcrumbs: React.FC<PropsType> = ({ className }) => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    const location = useLocation()
    //console.log(location);
    const { pathname } = location;
    //console.log(pathname);
    const pathnames = pathname.split("/").filter((el) => el);

    return (
        <div className={cn(styles.body, { [className as string]: className })}>
            <MyButton onClick={goBack} startColor='pink' size='small' icon='_icon-arrow-back' />
            {pathnames.map((path, index) => {
                const routeTo = pathnames.slice(0, index + 1).join('/')
                //console.log('routeTo: ', routeTo);
                const isLast = index === pathnames.length - 1
                return isLast
                    ? <Link to={'/' + routeTo} key={index} className={cn(styles.btn, { [styles.active]: true })}>{path}</Link>
                    : <Link to={'/' + routeTo} key={index} className={styles.btn}>{path}</Link>
            })}
        </div>
    )
}


