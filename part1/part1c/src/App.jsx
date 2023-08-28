import { useState } from 'react'

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
    <p>
      Hello {name}, you are {age} years old
    </p>
    <p>You were probably born in {bornYear()}</p>
  </div>
  )
}

const App = () => {
  let [ counter, setCounter ] = useState(0)
  setTimeout(
    () => setCounter(++counter),
    1000
  )
  return (
    <div>{counter}</div>
  )
}

export default App
