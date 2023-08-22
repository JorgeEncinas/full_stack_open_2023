const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name="Peter"
  const age = 20
  const friends = [ "Phoenix", "Maya"]
  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App
