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

  export default Course;