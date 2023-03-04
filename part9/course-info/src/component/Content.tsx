import { Course } from "../type";

const Content = ({courses}:{courses: Course[]}) => {
  console.log('courses props ->', courses);
  return(
    <div>
      { courses.map(course => (
        <p key={course.name}>
         {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
}

export default Content