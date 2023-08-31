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

export default Course;