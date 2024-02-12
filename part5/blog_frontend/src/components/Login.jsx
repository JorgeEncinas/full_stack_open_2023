import { useState } from 'react'
import loginService from '../services/login'
import { useNotification } from '../contexts/NotificationContext'

const Login = ({ user, handleSetUser }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { _notification, setNotification } = useNotification()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username,
                password: password
            })
            if (user) {
                handleSetUser(user)
                setUsername("")
                setPassword("")
                setNotification({
                    class:"success",
                    message:"Login successful!",
                    delayMillis: 5000
                })
            }
        } catch (error) {
            setNotification({
                class: "error",
                message: error.response.data?.error,
                delayMillis: 8000
            })
        }
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const logout = () => {
        if(user) {
            handleSetUser(null)
            setNotification({
                class: "success",
                message: "Logged out successfully."
            })
        }
    }

    if(user) {
        return (
            <div>
                <h3>Logged in as {user.name} ({user.username}). </h3>
                <button
                    onClick={logout}
                >
                    Log out.
                </button><br/><br/>
            </div> 
        )
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text"
                    placeholder="Enter username"
                    onChange={handleChangeUsername}
                /> <br/>
                <input type="password"
                    placeholder="Enter password"
                    onChange={handleChangePassword}
                /> <br/>
                <button>
                    Login
                </button>
            </form> <br/>
        </div>    
    )
}

export default Login