
const Part3 = ({ part }) => {
  return (
    <li>{part.name} - {part.exercises}</li>
  )
}

const Parts = ({ parts }) => {
  const partsStruct = parts.map(part => {
    return <Part3 key={part.id} part={part}/>
  })

  return (
    <ul>
      {partsStruct}
    </ul>
  )
}

const SumOfExercises = ({parts}) => {
  const sum = parts.reduce((sum, part) => {
    return sum + part.exercises
  },0)

  return (
    <div>
      Total of exercises: {sum}
    </div>
  )
}

const Course = ({course}) => {
  //console.log(course)

  return (
    <>
      <h1>{course.name}</h1>
      <Parts parts={course.parts} />
      <SumOfExercises parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App;
