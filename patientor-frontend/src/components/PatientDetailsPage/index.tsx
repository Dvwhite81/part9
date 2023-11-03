import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Male, Female, Transgender } from '@mui/icons-material';
import { Button, Alert, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { Patient, Gender, Diagnosis, Entry, NewEntry } from '../../types';
import patientService from '../../services/patients';
import { EntryDetails } from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
        setEntries(patient.entries);
      } catch (error) {
        console.log(error);
      }
    };

    void getPatientDetails();
  }, [id, entries]);

  if (!patient || !id) {
    return null;
  }

  const submitNewEntry = async (values: NewEntry) => {
    try {
      await patientService.createEntry(id, values);
      setEntries(patient.entries);
      setModalOpen(false);
      // Maybe use values?
      setSuccess(`Added a new entry: ${values.description}!`);
      setTimeout(() => {
        setSuccess(undefined);
      }, 5000);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className='App'>
      <Button component={Link} to='/' variant='contained' color='primary'>
        Home
      </Button>
      <Button className='add-button' variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <Box>
        {success && <Alert severity="success">{success}</Alert>}
        <Typography className='patient-name' align='left' variant='h6'>
          {patient.name}&nbsp;
          {patient.gender === Gender.Male ? <Male /> : ''}
          {patient.gender === Gender.Female ? <Female /> : ''}
          {patient.gender === Gender.Other ? <Transgender /> : ''}
        </Typography>
      </Box>
      <div className='patient-details-div'>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <h3>Entries</h3>
      <div>
        {entries.map((entry: Entry) => (<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientDetailsPage;
