import { CoursePart } from "../type";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({course}:{course: CoursePart}) => {
  switch (course.kind) {
    case "basic":
      return(
        <div>
          <h2>{course.name} {course.exerciseCount}</h2>
          <p>{course.description}</p>
        </div>
      );
      break;
    case "group":
      return(
        <div>
          <h2>{course.name} {course.exerciseCount}</h2>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      );
      break;
    case "background":
        return(
          <div>
            <h2>{course.name} {course.exerciseCount}</h2>
            <p>{course.description}</p>
            <p>{course.backroundMaterial}</p>
          </div>
        );
        break;
    case "special":
        return(
          <div>
            <h2>{course.name} {course.exerciseCount}</h2>
            <p>{course.description}</p>
            <p>required skills: {course.requirements.map(r => (<> {r},</>))} </p>
          </div>
        );
        break;
    default:
      return assertNever(course);
      break;
  }
};

export default Part;