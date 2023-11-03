import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Male, Female, Transgender } from '@mui/icons-material';
import { Patient, Gender } from '../../types';
import patientService from '../../services/patients';

const PatientDetailsPage = () => {
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
      <div>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
