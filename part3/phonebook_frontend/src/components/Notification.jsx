const Notification = ({classesString, notifMessage}) => {
    if (notifMessage === null) {
        return null
    }
    return (
        <div className={`notification ${classesString}`}>
            {notifMessage}
        </div>
    )
}

export default Notification