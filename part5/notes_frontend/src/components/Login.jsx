import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { useNotification } from '../contexts/NotificationContext'

const Login = ({ user, handleSetUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ _notification, setNotification ] = useNotification()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
          const user = await loginService.login({
            username: username,
            password: password
          })
          handleSetUser(user)
          setUsername('')
          setPassword('')
        } catch (error) {
          setNotification({
            class:'error',
            message:'Wrong credentials',
            delayMillis:5000
          })
        }
      }
    
    if(user) return (
        <h1>Logged in as {user}.</h1>
    )

    return ( 
        <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
}

Login.propTypes = {
    user: PropTypes.object,
    handleSetUser: PropTypes.func,
    handleSetErrorMessage: PropTypes.func,
}

export default Login