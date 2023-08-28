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

const Display = (props) => {
  return(
    <div>{props.counter}</div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter+1);
  const setToZero = () => setCounter(0);
  const decreaseByOne = () => setCounter(counter-1);
  return (
    <>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="Add 1" />
      <Button handleClick={setToZero} text="Reset to 0"/>
      <Button handleClick={decreaseByOne} text="Subtract 1" />
    </>
  )
}

export default App
