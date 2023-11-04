import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, HealthCheckEntry } from '../types';
import patients from '../../data/patients';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, averageRating }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    averageRating
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

const patientRating = (id: string): number => {
  const patient = getPatientById(id);

  if (!patient) throw new Error('No patient with that id');
  const entries: HealthCheckEntry[] = [];
  patient.entries.forEach(entry => {
    if (entry.type === 'HealthCheck') {
      entries.push(entry);
    }
  });
  const average = Math.ceil(entries.reduce((sum, e) => sum + e.healthCheckRating, 0) / entries.length);
  return average;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const newEntry = {
    ...entry,
    id: uuid()
  };

  const patient = getPatientById(id);

  if (patient) {
    patient.entries.push(newEntry);

    if (entry.type === 'HealthCheck') {
      patient.averageRating = patientRating(id);
    }
  }

  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
  patientRating
};
