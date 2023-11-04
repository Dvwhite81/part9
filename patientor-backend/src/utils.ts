import { NewPatient, Gender, NewEntry, Diagnosis, Discharge, SickLeave, HealthCheckRating } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') throw new Error('New patient data must be an object');

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
      occupation: parseInput(object.occupation, 'occupation'),
      entries: [],
      averageRating: undefined
    };

  return newPatient;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') throw new Error('New entry data must be an object');

  if (!('description' in object)) throw new Error('Entry\'s description field is missing');
  if (!('date' in object)) throw new Error('Entry\'s date field is missing');
  if (!('specialist' in object)) throw new Error('Entry\'s specialist field is missing');
  if (!('type' in object)) throw new Error('Entry\'s type field is missing');

  const newEntry = {
    description: parseInput(object.description, 'description'),
    date: parseInput(object.date, 'date'),
    specialist: parseInput(object.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(object)
  };

  switch (object.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) throw new Error('Entry\'s healthCheckRating field is missing');

      return {
        ...newEntry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };

    case 'OccupationalHealthcare':
      if (!('employerName' in object)) throw new Error('Entry\'s employerName field is missing');

      return {
        ...newEntry,
        type: object.type,
        employerName: parseInput(object.employerName, 'employerName'),
        sickLeave: parseSickLeave(object)
      };

    case 'Hospital':
      if (!('discharge' in object)) throw new Error('Entry\'s discharge field is missing');

      return {
        ...newEntry,
        type: object.type,
        discharge: parseDischarge(object.discharge)
      };

    default:
      throw new Error(`Error with entry type: ${object.type}`);
    }
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (object && typeof object === 'object') {
    if ('sickLeave' in object && object.sickLeave !== null) {
      if (typeof object.sickLeave !== 'object') throw new Error('Sick leave must be an object');
      if (!('startDate' in object.sickLeave)) throw new Error('Sick leave must include a start date');
      if (!('endDate' in object.sickLeave)) throw new Error('Sick leave must include an end date');

      return {
        startDate: parseInput(object.sickLeave.startDate, 'sick leave start date'),
        endDate: parseInput(object.sickLeave.endDate, 'sick leave end date')
      };
    }
  }
  return undefined;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === null) throw new Error('Entry must include a healthCheckRating number');
  if (typeof rating !== 'number') throw new Error('Health Check Rating must be a number');
  if (rating < 0 || rating > 3) throw new Error('Health Check Rating must be 0, 1, 2, or 3');

  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') throw new Error('Entry must include a discharge field object');
  if (!('date' in discharge)) throw new Error('Discharge must include date');
  if (!('criteria' in discharge)) throw new Error('Discharge must include criteria');

  return {
    date: parseInput(discharge.date, 'discharge date'),
    criteria: parseInput(discharge.criteria, 'discharge criteria')
  };
};
