import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Male, Female, Transgender } from '@mui/icons-material';
import { Patient, Gender, Diagnosis } from '../../types';
import patientService from '../../services/patients';

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
      <div>
        <h2>
          {patient.name}&nbsp;
          {patient.gender === Gender.Male ? <Male /> : ''}
          {patient.gender === Gender.Female ? <Female /> : ''}
          {patient.gender === Gender.Other ? <Transgender /> : ''}
        </h2>
        <div>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      </div>
      <div>
        <h3>Entries</h3>
        {patient.entries.map(entry =>
          <div key={entry.id}>
            <p><strong>{entry.date}:</strong> <em>{entry.description}</em></p>
            <ul>
              {entry.diagnosisCodes?.map(d =>
                <li key={d}>{d}: {diagnoses.find(diag => diag.code === d)?.name}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
