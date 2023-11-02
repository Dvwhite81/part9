import { NewPatient, Gender } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('New patient data must be an object');
  }

  if (!('name' in object)) throw new Error('Entry\'s name field is missing');
  if (!('dateOfBirth' in object)) throw new Error('Entry\'s date of birth field is missing');
  if (!('ssn' in object)) throw new Error('Entry\'s ssn field is missing');
  if (!('gender' in object)) throw new Error('Entry\'s gender field is missing');
  if (!('occupation' in object)) throw new Error('Entry\'s occupation field is missing');

  const newPatient = {
      name: parseInput(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseInput(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseInput(object.occupation, 'occupation')
    };

  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEmpty = (text: string): boolean => {
  return text.length === 0;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  if (!date) {
    throw new Error('Missing input for date field');
  }

  return date;
};

const parseInput = (input: unknown, name: string): string => {
  if (!isString(input)) {
    throw new Error(`Incorrect input for ${name} field`);
  }
  if (isEmpty(input)) {
    throw new Error(`Missing input for ${name} field`);
  }
  return input;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender)) {
    throw new Error('Incorrect input for gender');
  }
  if (isEmpty(gender)) {
    throw new Error('Missing input for gender');
  }
  if(!isGender(gender)) {
    throw new Error(`Incorrect type of gender: ${gender}`);
  }
  return gender;
};

export default toNewPatient;
