
const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  //Exercise 1.2 required this component.
  //Thus, the "map" function was changed.
  return (
    <>
    <h3><i>{props.part.name}</i> - {props.part.exercises} exercises</h3>
    </>
  )
}

const Content = (props) => {
  //Idea taken from React's documentation at https://react.dev/learn
  //I thought there must be a way to print this
  //Without writing the component out three times.
  const listParts = props.parts.map(part =>
      <Part part={part} />
    );
  return (
    <>
      {listParts}
    </>
  )
}

const Total = (props) => {
  //I thought there might also be a way to calculate it
  //So I checked the Array documentation, going from map()
  //To looking for a "forEach" function like native JS has.
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  var exerciseTotal = 0;
  props.parts.forEach((part) => {
    exerciseTotal += part.exercises;
  });
  return (
    <>
    <h3>Number of exercises: <b>{exerciseTotal}</b></h3>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { part:1, name:"Fundamentals of React", exercises:10 },
    { part:2, name:"Using props to pass data", exercises:7 },
    { part:3, name:"State of a component", exercises:14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App;
