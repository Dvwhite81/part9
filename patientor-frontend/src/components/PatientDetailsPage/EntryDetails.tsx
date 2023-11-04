import React from 'react';
import { LocalHospital, Work, MedicalServices, Favorite } from '@mui/icons-material';
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';

const heartColor = (rating: number) => {
  switch (rating) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'orange';
    case 3:
      return 'red';
    default:
      return 'black';
  }
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const DiagnosisListElement = ({ entry, diagnoses }: Props) => {
  if (!entry.diagnosisCodes) return null;
  if (entry.diagnosisCodes.length === 0) {
    return (
      <p>No diagnoses to show for this patient</p>
    );
  }

  return (
    <ul>
      {entry.diagnosisCodes.map(d => (
        <li key={d}>
          {d}: {diagnoses.find(diag => diag.code === d)?.name}
        </li>
        )
      )}
    </ul>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return (
    <div className='patient-entry-item'>
      <p><strong>{entry.date}</strong> <MedicalServices /></p>
      <p><strong>Details: </strong><em>{entry.description}</em></p>
      <p style={{ color: heartColor(entry.healthCheckRating) }}><Favorite /></p>
      <p><strong>Diagnosed by: </strong>{entry.specialist}</p>
      <h4>Diagnoses:</h4>
      <DiagnosisListElement entry={entry} diagnoses={diagnoses} />
    </div>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return (
    <div className='patient-entry-item'>
      <p><strong>{entry.date}</strong> <LocalHospital /></p>
      <p><strong>Details: </strong><em>{entry.description}</em></p>
      <p><strong>Diagnosed by: </strong>{entry.specialist}</p>
      <h4>Diagnoses:</h4>
      <DiagnosisListElement entry={entry} diagnoses={diagnoses} />
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return (
    <div className='patient-entry-item'>
      <p><strong>{entry.date}</strong> <Work /> Employer: {entry.employerName}</p>
      <p><strong>Details: </strong><em>{entry.description}</em></p>
      <p><strong>Diagnosed by: </strong>{entry.specialist}</p>
      <h4>Diagnoses:</h4>
      <DiagnosisListElement entry={entry} diagnoses={diagnoses} />
    </div>
  );
};

const assertNever = (obj: never) => {
  throw new Error('Unexpected type of entry: ' + obj);
};

export const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};
