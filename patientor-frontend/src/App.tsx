import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnosis, Entry } from './types';
import patientService from './services/patients';
import diagnosisService from './services/diagnoses';
import PatientListPage from './components/PatientListPage';
import PatientDetailsPage from './components/PatientDetailsPage';
import './App.css';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnosisList();
  }, [patients, setPatients, entries, setEntries]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Divider hidden />
          <Routes>
            <Route path='/' element={<PatientListPage patients={patients} setPatients={setPatients} diagnoses={diagnoses} />} />
            <Route path="/patients/:id" element={<PatientDetailsPage diagnoses={diagnoses} entries={entries} setEntries={setEntries} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
