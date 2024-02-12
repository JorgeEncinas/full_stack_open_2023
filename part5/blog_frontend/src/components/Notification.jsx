import { useNotification } from '../contexts/NotificationContext'
import { useEffect } from 'react'

const Notification = () => {

    const { notification, setNotification } = useNotification()

    useEffect(() => {
        if(notification) {
            setTimeout(() => {
                setNotification(null)
            }, notification.delayMillis ? notification.delayMillis : 5000)
        }
    }, [notification])

    if(notification) {
        return (
            <div className={notification.class}>
                {notification.message}
            </div>
        )
    }
    return null
}

export default Notification