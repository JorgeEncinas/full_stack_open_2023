import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef(({ children, showLabel, hideLabel = "Cancel" }, ref) => {
    
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    }) 

    if(!isVisible) {
        return (
            <button
                onClick={() => {setIsVisible(true)}}
            >
                {showLabel}
            </button>
        )
    }
    return (
        <div>
            {children}
            <button
                onClick={() => {setIsVisible(false)}}>
                    {hideLabel}
            </button>
        </div>
    )
})

Togglable.displayName = "Togglable"

export default Togglable