import { createContext, useState, useContext } from 'react'

const NotificationContext = createContext(undefined)

export const NotificationProvider = ({ children }) => {
    const [ notification, setNotification ] = useState(null)

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            { children }
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const notifContext = useContext(NotificationContext)
    if(!notifContext) {
        throw new Error('Need to nest the useContext component within its appropriate provider.')
    }
    return notifContext
}
