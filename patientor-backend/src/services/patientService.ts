import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types';
import patients from '../../data/patients';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const newEntry = {
    ...entry,
    id: uuid()
  };

  const patient = patients.find(p => p.id === id);

  if (patient) {
    patient.entries.push(newEntry);
  }
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};
