import { CoursePart } from "../type";

const Total = ({ courses }: { courses: CoursePart[] }) => {
  const total:number = courses.reduce((sum, part) => sum + part.exerciseCount, 0);
  return(
    <p>
     Number of exercises: {total}
    </p>
  );
};

export default Total;