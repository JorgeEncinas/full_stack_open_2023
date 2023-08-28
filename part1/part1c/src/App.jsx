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
  const [ counter, setCounter ] = useState(0)
  const handleClick = () => {
    console.log("clicked");
  }
  return (
    <>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </>
  )
}

export default App
