
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

  //const sumReduceFurther = parts.reduce((sum, part) => sum + part.exercises, 0)

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
 /*
const Courses = ({courses}) => {
  const coursesStruct = courses.map((course) =>{
    return (
      <Course key={course.id} course={course} />
    )
  })

  return (
    <div>
      {coursesStruct}
    </div>
  )
} */

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  //If you're not meant to create a "Courses" component
  //Then this is how I think the solution would go...

  const coursesStruct = courses.map((course) => {
    return (
      <Course key={course.id} course={course} />
    )
  })

  return (
    <div>
      {coursesStruct}
    </div>
  )
}

export default App;
