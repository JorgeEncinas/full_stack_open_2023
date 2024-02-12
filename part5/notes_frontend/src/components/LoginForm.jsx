import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    attemptLogin
}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        let attempt = await attemptLogin({
            username: username,
            password: password
        })
        if (attempt.wasSuccessful) {
            setUsername('')
            setPassword('')
        } else {
            console.log("Failure")
        }

    }

    return (
        <div>
        <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={
                            event => setUsername(event.target.value)
                        }
                    />
                    </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={
                            event => setPassword(event.target.value)
                        }
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    attemptLogin: PropTypes.func,
}

export default LoginForm