import { useState } from 'react'
import loginService from '../services/login'

const Login = ({ user, handleSetUser }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const logout = () => {
        if(user) handleSetUser(null)
    }

    if(user) {
        return (
            <div>
                <h3>Logged in as {user.name} ({user.username}). </h3>
                <button
                    onClick={logout}
                >
                    Log out.
                </button>
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
            </form>
        </div>    
    )
}

export default Login