import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Male, Female, Transgender } from '@mui/icons-material';
import { Patient, Gender, Diagnosis, Entry } from '../../types';
import patientService from '../../services/patients';
import { EntryDetails } from './EntryDetails';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      } catch (error) {
        console.log(error);
      }
    };

    void getPatientDetails();
  }, [id]);

  if (!patient || !id) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}&nbsp;
        {patient.gender === Gender.Male ? <Male /> : ''}
        {patient.gender === Gender.Female ? <Female /> : ''}
        {patient.gender === Gender.Other ? <Transgender /> : ''}
      </h2>
      <div className='patient-details-div'>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <h3>Entries</h3>
      <div>
        {patient.entries.map((entry: Entry) => (<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />))}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
