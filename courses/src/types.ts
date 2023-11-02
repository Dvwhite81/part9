interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface PartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends PartBaseWithDescription {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group'
}

interface CoursePartBackground extends PartBaseWithDescription {
  backgroundMaterial: string;
  kind: 'background'
}

interface CoursePartSpecial extends PartBaseWithDescription {
  requirements: ['nodejs', 'jest'];
  kind: 'special';
}

export interface HeaderProps {
  name: string;
}

export interface PartProps {
  part: CoursePart
}

export interface ContentProps {
  parts: CoursePart[];
}

export interface TotalProps {
  total: number;
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
