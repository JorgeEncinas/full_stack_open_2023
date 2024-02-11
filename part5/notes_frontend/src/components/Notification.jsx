import { useEffect } from 'react'
import { useNotification } from '../contexts/NotificationContext'

/*
  notification {
    class: string,
    message: string,
    delayMillis: number
  }
*/

const Notification = () => {

  const { notification, setNotification } = useNotification()

  useEffect(() => {
    if(notification) {
      setTimeout(() => {}, notification.delayMillis ? notification.delayMillis : 5000)
      setNotification(null)
    }
  }, [notification, setNotification])

  if (notification === null || notification === undefined) {
    return null
  }
  console.log(notification)
  return (
    <div className={notification.class}>
      {notification.message}
    </div>
  )
}

export default Notification;