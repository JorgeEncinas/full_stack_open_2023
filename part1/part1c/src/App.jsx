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

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
        {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left+1;
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right+1;
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
}

const App1 = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = () => {
    console.log("increasing, value before ", counter)
    setCounter(counter+1);
  }
  const setToZero = () => {
    console.log("resetting to zero, value before ", counter)
    setCounter(0);
  }
  const decreaseByOne = () => {
    console.log("decreasing, value before ", counter)
    setCounter(counter-1);
  }
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
