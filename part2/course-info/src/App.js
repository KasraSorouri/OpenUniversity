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


  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>  <Course course={course} />)}
    </div>
  )
}

export default App

const Course = (props) => {
  console.log(props);
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log('Heder props -> ', props)
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Content = (props) => {
  console.log('Content props -> ', props)

  return (
    props.parts.map(part => <Part key={part.name} part={part} />)
  )
}

const Part = (props) => {
  console.log('Part props -> ', props)
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Total = (props) => {
  console.log('Total props -> ', props.parts)
  let total = props.parts.reduce((sum, part) => sum += part.exercises, 0);

  return (
    <>
      <h3>Number of exercises {total}</h3>
    </>
  )
}