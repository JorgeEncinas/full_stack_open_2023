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

  const [ notification, setNotification ] = useNotification()

  useEffect(() => {
    if(notification) {
      console.log("started timeout")
      setTimeout(() => {
        setNotification(null)
      }, notification.delayMillis ? notification.delayMillis : 5000)
      
      console.log("finished timeout")
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