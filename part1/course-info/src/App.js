const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
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

  const Part =(props) => {
    console.log('Part props -> ', props)
    return(
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )}

  return (
    <div>
      <Header course={course.name} />
      <Content  parts={course.parts}/>
      <Total  parts={course.parts} />
    </div>
  )
}

export default App;