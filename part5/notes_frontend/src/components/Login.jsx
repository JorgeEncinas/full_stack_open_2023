import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { useNotification } from '../contexts/NotificationContext'

const Login = ({ user, handleSetUser }) => {

    //console.log("running with user...", user)

    const [isHidden, setIsHidden] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ _notification, setNotification ] = useNotification()

    const logout = () => {
      window.localStorage.removeItem('loggedNoteappUser')
      handleSetUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
          const user = await loginService.login({
            username: username,
            password: password
          })

          window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
          )

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

    const renderConditionally = () => {
      if(isHidden) {
        return (
          <div>
            <button onClick={() => setIsHidden(false)}>Log in</button>
          </div>
        )
      } else {
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
          <button type="button" onClick={() => setIsHidden(true)}>cancel</button>
        </form>
        )
      }
    }
    
    if(user) return (
      <div style={{"margin-bottom": "10px"}}>
        <h3>Logged in as {user.name} ({user.username}).</h3>
        <button onClick={logout}>Log out</button>
      </div>
    )

    return (
      <div style={{"margin-bottom": "10px"}}>
        {renderConditionally()}
      </div>
    )
}

Login.propTypes = {
    user: PropTypes.object,
    handleSetUser: PropTypes.func.isRequired,
}

export default Login