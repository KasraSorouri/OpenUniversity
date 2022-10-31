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
      }
    ]
  }

  return <Course course={course} />
}

export default App

const Course = (props) => {
  console.log(props);
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content  parts={course.parts}/>
      <Total  parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log('Heder props -> ', props)
  return(
  <>
    <h1>{props.course}</h1>
  </>
)}

const Content = (props) => {
  console.log('Content props -> ', props)

  return(
    props.parts.map(part => <Part key={part.name} part={part} />)
  )
}

const Part =(props) => {
  console.log('Part props -> ', props)
  return(
  <>
    <p>{props.part.name} {props.part.exercises}</p>
  </>
)}

const Total =(props) => {
  console.log('Total props -> ', props.parts)
  let sum = 0;
  props.parts.forEach(element => {
    sum = sum + element.exercises
  });
  
  return(
  <>
     <p>Number of exercises {sum}</p>
  </>
)}