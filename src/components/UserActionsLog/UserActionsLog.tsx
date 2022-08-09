import moment from 'moment'
import { useTypedSelector } from '../../hooks/redux'
import { isToday } from '../../utils/DateFunctions'
import styles from './UserActionsLog.module.scss'

export const UserActionsLog: React.FC = () => {
    //const votes = useTypedSelector(state => state.voting.votes)
    const userActions = useTypedSelector(state => state.userActionsRD.userActions)

    return (
        <ul className={styles.list}>
            {userActions.map(act => {
                const date = new Date(act.date)
                const dateStr = isToday(date)
                    ? moment(date).format('HH:mm')
                    : moment(date).format('DD.MM.YYYY')
                //console.log(dateStr);                


                return <li key={+act.date} className={styles.item}>
                    <span className={styles.date}>
                        {dateStr}
                    </span>
                    <p className={styles.text}>
                        Image ID: <span className={styles.imageId}>{act.image_id}</span> was {act.action}
                        {act.action === 'added' ? ' to' : ' from'} {act.type}
                    </p>
                    {act.action === 'added' && <span className={[styles.icon, act.icon, styles[`icon${act.type}`]].join(' ')} />}
                </li>
            })}
        </ul>
    )
}