interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourcePartBaseWithDescription extends CoursePartBase {
  description: string;
}
 
interface CoursePartBasic extends CourcePartBaseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CourcePartBaseWithDescription {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CourcePartBaseWithDescription {
  requirements: string[];
  kind:"special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;
