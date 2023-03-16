import { CoursePart } from "../type";
import Part from "./Part";

const Content = ({courses}:{courses: CoursePart[]}) => {
  console.log('courses props ->', courses);
  return(
    <div>
      { courses.map(course => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  );
}

export default Content