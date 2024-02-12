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
            <div>
                <button
                    onClick={() => {setIsVisible(true)}}
                >
                    {showLabel}
                </button>
            </div>
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