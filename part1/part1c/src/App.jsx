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
    setCounter(counter+1);
  }
  return (
    <>
      <div>{counter}</div>
      <button onClick={handleClick}>
        Add 1
      </button>
      <button onClick={() => setCounter(0)}>
        Reset counter
      </button>
    </>
  )
}

export default App
