import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null)

    return (
        <NotificationContext.Provider value={[ notification, setNotification ]}>
            { children }
        </NotificationContext.Provider>
    )
}

NotificationProvider.propTypes = {
    children: PropTypes.node
}

export const useNotification = () => { //I've seen this pattern at work, but it's thanks to ChatGPT that I recreated it.
    const context = useContext(NotificationContext)
    if(!context) {
        throw new Error('You have to use useNotification within a provider')
    }
    return context
}